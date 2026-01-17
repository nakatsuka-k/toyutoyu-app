# Assets Folder

Place your app images here:

- `home-bg.png` - Splash screen home image (used by SplashScreen component on app startup)

## Adding Images

1. Copy `home-bg.png` to this folder
2. For iOS, add via Xcode:
   - Drag `home-bg.png` into `Images.xcassets`
   - Set target membership to `ToyuToyuApp`

3. For Android, copy to:
   - `android/app/src/main/res/mipmap-mdpi/`
   - `android/app/src/main/res/mipmap-hdpi/`
   - `android/app/src/main/res/mipmap-xhdpi/`
   - (resize accordingly for each density)

The SplashScreen component will automatically load `home-bg.png` on app startup.
