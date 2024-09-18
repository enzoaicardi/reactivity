import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const formats = ["iife", "esm", "cjs", "umd"];

export default formats.map(function (format) {
    return {
        input: "src/@enzoaicardi/reactivity.ts",
        output: {
            file: `dist/${format}/reactivity.${
                format === "cjs" ? "cjs" : "js"
            }`,
            format: format,
            name: (format === "iife" || format === "umd") && "Reactivity",
            minifyInternalExports: true,
        },
        plugins: [
            typescript({
                module: "esnext",
                compilerOptions: {
                    target: "esnext",
                },
                rootDir: "src",
            }),
            terser({
                mangle: {
                    properties: {
                        reserved: [
                            "value",
                            "get",
                            "set",
                            "use",
                            "add",
                            "delete",
                            "clear",
                            "entry",
                        ],
                    },
                },
            }),
        ],
    };
});
