#!/bin/bash

# Define the file name
FILE="README.md"

# Extract the section between <!--FEATURES_LIST--> and <!--/FEATURES_LIST-->
section=$(sed -n '/<!--FEATURES_LIST-->/, /<!--\/FEATURES_LIST-->/p' "$FILE")

# Count total tasks (both completed and uncompleted) within the extracted section
total_tasks=$(echo "$section" | grep -oP "\- \[\s?x?\]" | wc -l)
completed_tasks=$(echo "$section" | grep -oP "\- \[x\]" | wc -l)

# Calculate the percentage of completed tasks
if [ $total_tasks -ne 0 ]; then
    percentage=$((100 * completed_tasks / total_tasks))
else
    percentage=0
fi

echo "$percentage% - done $completed_tasks of $total_tasks tasks"

# Update the file by replacing content between <!--PROGRESS--> and <!--/PROGRESS-->
sed -i "s/<!--PROGRESS-->.*<!--\/PROGRESS-->/<!--PROGRESS--> $percentage% \/ $completed_tasks of $total_tasks tasks <!--\/PROGRESS-->/" "$FILE"
