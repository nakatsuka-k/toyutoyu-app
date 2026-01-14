# toyutoyu-app

React Native（iOS / Android）で `https://toyutoyu.com` をWebViewで固定表示するだけのアプリです。

- 実体のプロジェクトは `mobile/` 配下にあります
- iOSはiPhone/iPad（Universal）でビルドできる前提です

## 開発実行

```sh
cd mobile
npm start
```

### iOS（Simulator / 実機）

```sh
cd mobile
npm run ios
```

初回 or ネイティブ依存更新時は以下も実行してください。

```sh
cd mobile/ios
pod install
```

### Android（Emulator / 実機）

```sh
cd mobile
npm run android
```

## リリースビルド

### iOS（ipa / iPad含む）

- Xcodeで `mobile/ios/ToyuToyuApp.xcworkspace` を開く
- Signing（Team / Bundle ID）を設定
- `Product > Archive` → Organizerから `Distribute App`（App Store / Ad Hoc / Development など）

### Android（AAB推奨）

署名（keystore）設定後、

```sh
cd mobile/android
./gradlew bundleRelease
```

生成物: `mobile/android/app/build/outputs/bundle/release/app-release.aab`
