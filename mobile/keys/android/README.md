# Android release keystore

This folder is intended to store the Android **release** keystore file used for Google Play signing.

- Keystore path (default): `mobile/keys/android/release.keystore`
- The keystore file (`*.keystore`) is ignored by git (see `mobile/.gitignore`).

## Generate

Run:

```sh
cd mobile
bash scripts/android-generate-keystore.sh
```

This will:
- create `mobile/keys/android/release.keystore`
- write `mobile/android/keystore.properties` (ignored) so Gradle can sign Release builds

## Notes

- Treat the keystore and passwords as secrets. Back them up securely.
- If you lose the keystore/passwords, you may lose the ability to update the app on Google Play.
