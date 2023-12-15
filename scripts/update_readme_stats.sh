#!/bin/bash

# Define the file name
FILE="README.md"

# Count total tasks (both completed and uncompleted)
total_tasks=$(grep -oP "\- \[\s?x?\]" "$FILE" | wc -l)
completed_tasks=$(grep -oP "\- \[x\]" "$FILE" | wc -l)

# Calculate the percentage of completed tasks
if [ $total_tasks -ne 0 ]; then
    percentage=$((100 * completed_tasks / total_tasks))
else
    percentage=0
fi

echo "$percentage% - done $completed_tasks of $total_tasks tasks"

# Update the file by replacing content between <!--PROGRESS--> and <!--/PROGRESS-->
sed -i "s/<!--PROGRESS-->.*<!--\/PROGRESS-->/<!--PROGRESS--> $percentage% \/ $completed_tasks of $total_tasks tasks <!--\/PROGRESS-->/" "$FILE"

