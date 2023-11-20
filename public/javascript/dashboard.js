const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: "/api/v1/users/users",
      headers: { "Content-Type": "multipart/form-data" },
    });
    const user = response.user;
    console.log("Dashboarduser", user);
    const userTableBody = document.getElementById("user-table-body");

    let htmlContent = "";

    if (user.length > 0) {
      for (let i = 0; i < user.length; i++) {
        if (!user[i].archived) {
          htmlContent += `
          <tr>
            <td>${user[i].email}</td>
            <td>${user[i].role}</td>
            <td><img src="/public/userImages/${user[i].image}" alt="${user[i].image}" width="100px" height="100px"></td>
            <td>${user[i].is_verified}</td>
            <td >
              <div class="d-flex gap-5">
                <a href="/users/editUser?id=${user[i]._id}" style="color:coral">Edit <i class="fa-solid fa-pen-to-square"></i></a>
              <a href="#" 
                dataId = "${user[i]._id}"
                style="color:coral"
                class="archive-Link"><i class="fa-solid fa-box-archive"></i></a>
                </td>            
              </div>
              
            </td>            
            </tr>`;
        }
      }
    } else {
      htmlContent = `<tr>
        <td>Users not found</td>
      </tr>`;
    }
    userTableBody.innerHTML = htmlContent;

    userTableBody.addEventListener("click", async function (event) {
      const archiveLinks = document.querySelectorAll(".archive-Link");
      archiveLinks.forEach((link) => {
        link.addEventListener("click", async function (event) {
          event.preventDefault();
          console.log("Link clicked.");

          const userId = link.getAttribute("dataId");
          console.log(userId);
          try {
            const response = await deleteUser({
              endpoint: `users/archive/${userId}`,
              headers: { "Content-Type": "application/json" },
              params: "data",
            });
            link.closest("tr").remove();
          } catch (error) {
            error.response && error.response.data.message
              ? error.response.data.message
              : "An internal server error occurred.";
          }
        });
      });
    });
  } catch (error) {
    console.log("errorr", error);
    throw error;
  }
};
