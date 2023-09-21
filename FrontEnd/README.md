# Troubleshooting "Could not find module '@angular-devkit/build-angular'"

If you encounter the error message "Could not find module '@angular-devkit/build-angular'" while working on an Angular project, it typically means that a required Angular CLI package is missing or not properly installed. This README provides a simple solution to resolve this issue.

## Problem Description

You encounter the following error message or something similar when trying to run or build your Angular project:


## Solution
Try running `npm install` and it should work . If there exist warning due to difference in cli versions try solution below

The solution to this problem is straightforward and involves installing the missing package `@angular-devkit/build-angular` as a development dependency in your project.

To do this, follow these steps:

1. Open your project's terminal or command prompt.

2. Navigate to the root directory of your Angular project. You can use the `cd` command to change your working directory if needed.

3. Run the following command to install the missing package as a development dependency: `npm install --save-dev @angular-devkit/build-angular`



