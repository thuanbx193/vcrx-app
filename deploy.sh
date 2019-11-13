#!/bin/bash

VERSION=$1

if [ "$VERSION" == "" ]; then
   echo "Syntax error: <version>"; exit;
fi

# -----------------------------------------------------------------------------
echo "Auto deploy APK-TOOL for VCRX CONNECT"
echo "   Output please check at: http://app.edubig.vn/vcrxconnect/"
echo ""
echo "Connecting...."
echo "   Please wait a second and enter deployer password..."
URI=android/app/build/outputs/apk/release/

mv ${URI}app-release.apk ${URI}VCRX_Connect_v${VERSION}.apk

scp -r -P 22  ${URI}VCRX_Connect_v${VERSION}.apk root@45.124.94.37:/var/www/html/app.edubig.vn/vcrxconnect