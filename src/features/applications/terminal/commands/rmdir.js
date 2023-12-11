import Command from "../command.js";

export const rmdir = new Command("rmdir", (args, { currentDirectory }) => {
	const name = args[0];
	const folder = currentDirectory.findSubFolder(name);

	if (!folder)
		return `${this.name}: ${args[0]}: No such directory`;
	
	folder.delete();
	return { blank: true };
}).setRequireArgs(true);