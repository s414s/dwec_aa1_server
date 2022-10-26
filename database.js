import { faker } from "@faker-js/faker"

let users = []
let projects = []
let extendedProjectInfo = []

// create users
for (let i = 0; i<50; i++) {
  users.push({
    id: i,
    name: faker.name.fullName(),
    years: faker.datatype.number({ min: 25, max: 38 }),
  })
}

// create projects
for (let i = 0; i<10; i++) {
  projects.push({
    id: i,
    name: faker.commerce.department(),
  })

  let numOfUsers = faker.datatype.number({ min: 1, max: 5 })
  let projectUsers = []
  while (numOfUsers > 0) {
    let randomUser = parseInt(Math.random() * users.length)
    if (projectUsers.indexOf(u => u.id === randomUser) >= 0) continue

    projectUsers.push(users[randomUser])
    numOfUsers--
  }

  extendedProjectInfo.push({
    id: i,
    description: faker.lorem.paragraphs(),
    startDate: faker.date.recent(365),
    users: projectUsers
  })
}

export default {
  users,
  projects,
  extendedProjectInfo
}