import json
import os
import re
import shutil
import subprocess
import sys


SRC_DIR = "src"
OUTPUT_DIR = "dist"

JS_INPUT = os.path.join(SRC_DIR, "neiki-file-manager.js")
CSS_INPUT = os.path.join(SRC_DIR, "neiki-file-manager.css")

JS_OUTPUT = os.path.join(OUTPUT_DIR, "neiki-file-manager.js")
JS_MIN_OUTPUT = os.path.join(OUTPUT_DIR, "neiki-file-manager.min.js")
JS_MIN_TEMP = os.path.join(OUTPUT_DIR, "neiki-file-manager.min.temp.js")
CSS_OUTPUT = os.path.join(OUTPUT_DIR, "neiki-file-manager.css")
CSS_MIN_OUTPUT = os.path.join(OUTPUT_DIR, "neiki-file-manager.min.css")

BANNER = "/* neiki-file-manager 1.0.0 | MIT */\n"

CSS_MARKER = "var EMBEDDED_CSS = '';"


def minify_css(css):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.DOTALL)
    css = re.sub(r"\s+", " ", css)
    css = re.sub(r"\s*([{}:;,>])\s*", r"\1", css)
    css = css.replace(";}", "}")
    return css.strip()


def read(path):
    with open(path, "r", encoding="utf-8") as handle:
        return handle.read()


def write(path, content):
    with open(path, "w", encoding="utf-8") as handle:
        handle.write(content)


def embed_css(js_source, css_text):
    if CSS_MARKER not in js_source:
        raise RuntimeError("Could not find EMBEDDED_CSS marker in src/neiki-file-manager.js")
    replacement = "var EMBEDDED_CSS = " + json.dumps(css_text) + ";"
    return js_source.replace(CSS_MARKER, replacement, 1)


def minify_js(input_path, output_path):
    npx = r"C:\Program Files\nodejs\npx.cmd" if sys.platform == "win32" else shutil.which("npx")
    if not npx:
        write(output_path, read(input_path))
        print("npx was not found; wrote an unminified bundle.")
        return

    try:
        subprocess.run(
            [npx, "terser", input_path, "-o", output_path, "--compress", "--mangle"],
            check=True,
        )
    except (subprocess.CalledProcessError, FileNotFoundError):
        write(output_path, read(input_path))
        print("terser failed; wrote an unminified bundle.")


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    js_source = read(JS_INPUT)
    css_source = read(CSS_INPUT)

    print("Copying CSS...")
    shutil.copyfile(CSS_INPUT, CSS_OUTPUT)

    print("Minifying CSS...")
    minified_css = minify_css(css_source)
    write(CSS_MIN_OUTPUT, BANNER + minified_css)

    print("Embedding CSS into JavaScript bundle (unminified)...")
    write(JS_OUTPUT, embed_css(js_source, css_source))

    print("Embedding CSS into JavaScript bundle (minified)...")
    write(JS_MIN_TEMP, embed_css(js_source, minified_css))

    print("Minifying JavaScript...")
    minify_js(JS_MIN_TEMP, JS_MIN_OUTPUT)
    os.remove(JS_MIN_TEMP)

    minified_js = read(JS_MIN_OUTPUT)
    if not minified_js.startswith("/* neiki-file-manager"):
        write(JS_MIN_OUTPUT, BANNER + minified_js)

    print("\nDONE")
    print(f"JS:  {JS_OUTPUT}")
    print(f"JS:  {JS_MIN_OUTPUT}")
    print(f"CSS: {CSS_OUTPUT}")
    print(f"CSS: {CSS_MIN_OUTPUT}")


if __name__ == "__main__":
    main()
