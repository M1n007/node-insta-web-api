function getString(start, end, all) {
	const regex = new RegExp(`${start}(.*?)${end}`);
	const str = all
	const result = regex.exec(str);
	return result;
}


module.exports = {
    getString
}