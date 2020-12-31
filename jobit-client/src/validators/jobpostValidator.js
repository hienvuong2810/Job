export function validateJobpost(jobpost) {
	let msg = { title: "", descriptions: "", expired_date: "", requirements: "", salary: "" };

  /**************Check null**************/

	if (!jobpost.title) {
		msg.title = "Title cannot be null.";
	}

  if (!jobpost.descriptions) {
    msg.descriptions = "Descriptions cannot be null."
  }

  if (!jobpost.requirements) {
    msg.requirements = "Requirements cannot be null."
  }

  if (!jobpost.expired_date) {
    msg.expired_date = "Expired_date cannot be null."
  }

  if (!jobpost.salary) {
    msg.salary = "Salary cannot be null."
  }

  /**************Check length**************/

	if (jobpost.title.length <= 10) {
		msg.title = "Title's length must > 10.";
	}

  if (jobpost.descriptions.length <= 10) {
		msg.descriptions = "Descriptions's length must > 10.";
	}

  for (let value of Object.values(msg)) {
    if (value !== "") {
      return { ok: false, msg }
    }
  }

	return { ok: true, msg };
}
