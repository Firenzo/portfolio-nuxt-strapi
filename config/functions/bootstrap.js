'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {
	//Work Experience
	const portfolioData = require('../../data/portfolioData.json');
	portfolioData.workExperience.forEach(entry => {

		strapi.query('work-experience').create({
			companyName: entry.companyName,
			city: entry.city,
			country: entry.country,
			function: entry.function,
			dateStart: entry.dateStart,
			dateEnd: entry.dateEnd
		})
	})

	let designSkills = portfolioData.skills.design
	let frontEndSkills = portfolioData.skills.frontEnd

	designSkills.forEach((entry,index) => {
		entry.id = index+1
	})

	frontEndSkills.forEach((entry,index) => {
		entry.id = index+1
	})

	console.log(designSkills);
	console.log(frontEndSkills);

	//Skills
	const currentSkills = strapi.query('skills').find({id: 1})
	let skillsToUpdate = {...currentSkills}

	skillsToUpdate.designSkills = designSkills
	skillsToUpdate.frontEndSkills = frontEndSkills
	strapi.query('skills').update({id:1}, skillsToUpdate)
};
