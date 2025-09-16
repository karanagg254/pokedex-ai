const fs = require("fs");
const path = require("path");

// Root components folder
const COMPONENTS_DIR = path.resolve(__dirname, "../src/components");

// Storybook template generator
function getStoryTemplate(componentName, importPath) {
  return `import type { Meta, StoryObj } from "@storybook/react";
import ${componentName} from "./${importPath}";

const meta: Meta<typeof ${componentName}> = {
  title: "Components/${componentName}",
  component: ${componentName},
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {
    // ✅ Add safe mock props here to prevent "undefined" errors
  },
};
`;
}

// Recursively walk through components dir
function generateStoriesForComponents(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      generateStoriesForComponents(fullPath);
    } else if (file.match(/\.tsx$/) && !file.includes(".stories")) {
      const componentName = path.basename(file, ".tsx");
      const storyFileName = `${componentName}.stories.tsx`;
      const storyFilePath = path.join(dir, storyFileName);

      if (!fs.existsSync(storyFilePath)) {
        console.log(`✨ Generating story for: ${componentName}`);
        const storyContent = getStoryTemplate(componentName, componentName);
        fs.writeFileSync(storyFilePath, storyContent, "utf-8");
      }
    }
  });
}

generateStoriesForComponents(COMPONENTS_DIR);
console.log("✅ Story files generated successfully!");
