import gulp from "gulp";
import { gulp as i18nextParser } from "i18next-parser";

gulp.task("i18n", async () => {
  const stream = gulp
    .src([
      "src/app/**/*.{js,jsx,ts,tsx}",
      "src/components/**/*.{js,jsx,ts,tsx}",
    ])
    .pipe(
      new i18nextParser({
        locales: ["en", "fr"],
        output:
          "public/locales/$LOCALE/$NAMESPACE.json",
      })
    )
    .pipe(gulp.dest("./"));

  await new Promise((resolve, reject) => {
    stream.on("end", resolve);
    stream.on("error", reject);
  });
});
