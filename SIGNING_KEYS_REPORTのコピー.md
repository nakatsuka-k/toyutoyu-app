# 署名・ビルドキー生成 完了レポート

## ✅ 完了項目

### Android
- **Keystoreの生成**: ✅ 完了
  - パス: `mobile/keys/android/release.keystore`
  - 生成コマンド: `bash scripts/android-generate-keystore.sh`
  - Gradle署名設定: `mobile/android/app/build.gradle` に反映済み
  - パスワード設定: `mobile/android/keystore.properties` （git ignored）

- **AABビルドの準備**: ✅ 完了
  - keystoreおよびGradle署名設定はセットアップ済み
  - ビルドコマンド: `cd mobile/android && ./gradlew bundleRelease`

### iOS
- **Team ID設定**: ✅ 完了
  - Team ID: `4AJFY7K2UM`
  - Xcode project settings に反映済み（Debug/Release両方）
  - Bundle ID: `com.toyutoyu.app`

- **自動署名（Automatic Signing）準備**: ✅ 完了
  - Xcodeで `Automatically manage signing` をONにするだけで、証明書・Provisioning Profileが自動生成されます
  - Xcode画面: Target → Signing & Capabilities → Team 選択

---

## 🔍 現在の状態

| 対象 | 項目 | 状態 | 詳細 |
|------|------|------|------|
| **Android** | Keystore | ✅ 生成済み | `mobile/keys/android/release.keystore` |
| **Android** | Gradle署名 | ✅ 設定済み | `mobile/android/keystore.properties` にパスワード |
| **Android** | AABビルド | 🚧 JDK互換性問題 | ローカル環境のJava/Gradle版数の互換性調整が必要 |
| **iOS** | Team ID | ✅ 設定済み | `4AJFY7K2UM` (project.pbxproj) |
| **iOS** | Bundle ID | ✅ 設定済み | `com.toyutoyu.app` |
| **iOS** | 自動署名 | ✅ 準備済み | Xcodeで Team 選択時に自動適用 |

---

## 📋 次のステップ

### iOSのビルド（App Store向け）

1. Xcodeを開く:
   ```sh
   open mobile/ios/ToyuToyuApp.xcworkspace
   ```

2. Target「ToyuToyuApp」 → **Signing & Capabilities**
   - **Automatically manage signing** をON
   - **Team** が `4AJFY7K2UM` に設定されていることを確認
   - Bundle Identifier が `com.toyutoyu.app` であることを確認

3. `Product > Archive`

4. Organizer画面で配布方法を選択

### Androidのビルド（Google Play向け）

**ローカル環境のJDK/Gradle互換性を調整した上で**：

```sh
cd mobile/android
./gradlew bundleRelease
```

出力先: `mobile/android/app/build/outputs/bundle/release/app-release.aab`

---

## 🔐 秘密情報の取り扱い

### Androidの場合
- `mobile/android/keystore.properties` はgit ignored
- `mobile/keys/android/release.keystore` ファイルそのものは現在リポジトリ内に保存
- **本番運用**: keystoreファイルはバージョン管理外の安全な場所（暗号化バックアップ等）で管理してください

### iOSの場合
- 証明書・Provisioning Profileはすべて Apple Developer Program（iCloud/App Store Connect）で管理
- ローカル管理の秘密情報なし
