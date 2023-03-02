#!/bin/bash
set -e
IFS='|'

# Get args
dir=$1
region=$2

# In development, AWS_PROFILE should be set. In CI, it's not.
[ "$AWS_PROFILE" ] || AWS_PROFILE="default"

FRONTENDCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"dist\",\
\"BuildCommand\":\"npm run-script build\",\
\"StartCommand\":\"npm run-script start\"\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"none\",\
\"config\":$FRONTENDCONFIG}"
AMPLIFY="{\
\"defaultEditor\":\"code\",\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":\"true\",\
\"profileName\":\"$AWS_PROFILE\",\
\"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
\"secretAccessKey\":\"$AWS_SECRET_ACCESS_KEY\",\
\"region\":\""$region\""\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG}"

cd $dir

echo n | yarn pull --amplify $AMPLIFY --frontend $FRONTEND --providers $PROVIDERS
