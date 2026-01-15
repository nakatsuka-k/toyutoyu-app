# Release guide (iOS / Android)

This project is a React Native WebView wrapper for `https://toyutoyu.com`.

- App name: と湯と湯
- iOS Bundle ID: `com.toyutoyu.app`
- Android applicationId: `com.toyutoyu.app`

## iOS (App Store / TestFlight)

### Prerequisites

- Apple Developer Program membership
- App Store Connect app created with Bundle ID `com.toyutoyu.app`

### Build & Upload

1. Open the workspace in Xcode:
   - `mobile/ios/ToyuToyuApp.xcworkspace`
2. Target **ToyuToyuApp** → **Signing & Capabilities**
   - Enable **Automatically manage signing**
   - Select Team (Team ID: `4AJFY7K2UM`)
   - Confirm Bundle Identifier is `com.toyutoyu.app`
3. `Product > Archive`
4. In Organizer: `Distribute App` → `App Store Connect` → Upload

Then manage release in App Store Connect (TestFlight → submit for review → release).

## Android (Google Play)

### 1) Generate release keystore

A keystore folder is prepared inside the repo:
- `mobile/keys/android/`

Run:

```sh
cd mobile
bash scripts/android-generate-keystore.sh
```

This will create:
- `mobile/keys/android/release.keystore`
- `mobile/android/keystore.properties` (ignored by git)

### 2) Build release AAB

```sh
cd mobile/android
./gradlew bundleRelease
```

Output:
- `mobile/android/app/build/outputs/bundle/release/app-release.aab`

### 3) Upload to Play Console

- Create app → create a release (Internal testing recommended first)
- Upload the `.aab`
- Resolve warnings, complete store listing, then promote to production

## Notes

- `mobile/android/keystore.properties` contains passwords in plain text for Gradle. It is git-ignored, but handle it carefully.
- Back up `release.keystore` securely. Losing it can prevent future updates on Google Play.
