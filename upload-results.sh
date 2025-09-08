#!/bin/bash
# Get the current date and time in the specified format
current_time=$(date "+%Y-%m-%d-%H-%M-%S")

# Define the path to the local file and the S3 bucket path
local_file="test-results/html-report/dark-cucumber-report-${current_time}.html"
bucket_name=$REPORT_BUCKET
cloudfront_url=$REPORT_DOMAIN
s3_folder="report"

# Create the new file name
new_file_name="light-cucumber-report-${current_time}.html"
s3_path="s3://${bucket_name}/${s3_folder}/${new_file_name}"

if [ ! -f "$local_file" ]; then
    failure_message=":large_red_square: Internal error in test execution prevented report file generation."
    echo $failure_message
    curl -X POST -H 'Content-type: application/json' --data "{\"text\": \"${failure_message}\"}" $SLACK_INCOMING_WEBHOOK
    exit 0
fi

# Upload the file to S3
aws s3 cp "${local_file}" "${s3_path}"

if [ $? -eq 0 ]; then
    echo "File has been uploaded successfully to ${s3_path}"
else
    echo "Failed to upload the file"
fi

url="https://${cloudfront_url}/${s3_folder}/${new_file_name}"

# Construct the message to send to Slack
success_message=":white_check_mark: ${PREFIX} All Testcases are passing : ${url}"
failure_message=":large_red_square: ${PREFIX} Some Testcases are failing : ${url}"

if [ $CODEBUILD_BUILD_SUCCEEDING -eq 0 ]; then
    curl -X POST -H 'Content-type: application/json' --data "{\"text\": \"${failure_message}\"}" $SLACK_INCOMING_WEBHOOK
else
    curl -X POST -H 'Content-type: application/json' --data "{\"text\": \"${success_message}\"}" $SLACK_INCOMING_WEBHOOK
fi
