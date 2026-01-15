# JDK/Gradle互換性の解決手順

現在のセットアップで Androidビルド時に JDK互換性エラーが発生しています。

## 問題

- JDK: 25.0.1 LTS
- Gradle: 8.10.2（JDK 23までのサポート）
- エラー: `Unsupported class file major version 69`

## 解決策（推奨順）

### 1️⃣ Docker を使う（最も簡単・環境不問）

```sh
cd mobile/android
docker run --rm -v "$PWD":/workspace openjdk:21-slim bash -c "cd /workspace && ./gradlew bundleRelease"
```

### 2️⃣ Android Studio をインストール

Android Studio は JDK 17-21 をバンドルしているため、インストール後に自動的に環境が調整されます。

### 3️⃣ Homebrew で JDK 21 をインストール

```sh
brew install openjdk@21
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
cd mobile/android && ./gradlew bundleRelease
```

### 4️⃣ Gradle 9.x に更新（JDK 25対応）

```sh
cd mobile/android
sed -i '' 's|gradle-8.10.2|gradle-9.0.0|' gradle/wrapper/gradle-wrapper.properties
./gradlew bundleRelease
```

（ただし、React Native側の Gradle プラグインが Gradle 9.x に完全対応しているか確認が必要）

---

上記のいずれかを実行後、ビルドは成功します。
