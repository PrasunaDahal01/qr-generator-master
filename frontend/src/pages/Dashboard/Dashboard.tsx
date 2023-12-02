async function deleteUsers(event, id) {
  event.preventDefault();
  try {
    await deleteUser({
      endpoint: `/api/v1/users/archive/${id}`,
      headers: { "Content-Type": "application/json" },
      params: "data",
    });

    pageLoad();
  } catch (error) {
    error.response && error.response.data.message
      ? error.response.data.message
      : "An internal server error occurred.";
  }
}

const fetchUsers = async () => {
  try {
    const response = await get({
      endpoint: "/api/v1/users/users",
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.user;
  } catch (error) {
    throw new Error("User not found.");
  }
};

const loadTable = (users) => {
  const userTableBody = document.getElementById("user-table-body");
  let htmlContent = "";

  users.forEach((user) => {
    htmlContent += `
          <tr>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><img src="/public/userImages/${user.image}" alt="${user.image}" width="100px" height="100px"></td>
            <td>${user.is_verified}</td>
            <td >
              <div class="d-flex gap-5">
                <a href="/users/editUser?id=${user._id}" style="color:coral">Edit <i class="fa-solid fa-pen-to-square"></i></a>
              <a href="#" 
              onclick="deleteUsers(event, '${user._id}')"
                dataId = "${user._id}"
                style="color:coral"
                class="archive-Link"><i class="fa-solid fa-box-archive"></i></a>
                </td>            
              </div>            
          </tr>`;
  });

  if (!htmlContent) {
    htmlContent = `<tr>
        <td>Users not found</td>
      </tr>`;
  }
  userTableBody.innerHTML = htmlContent;
};

const pageLoad = async () => {
  const users = await fetchUsers();
  loadTable(users);
};
