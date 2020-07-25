function getString(start, end, all) {
	const regex = new RegExp(`${start}(.*?)${end}`);
	const str = all
	const result = regex.exec(str);
	return result;
}

const createEncPassword = pwd => {
	return `#PWD_INSTAGRAM_BROWSER:0:${Date.now()}:${pwd}`
}


module.exports = {
	getString,
	createEncPassword
}