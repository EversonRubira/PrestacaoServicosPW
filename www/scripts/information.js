class Information {

  constructor(id) { 
      this.id = id;
      this.users = []; 
  }

  showHome() { 
      document.getElementById("headerTitle").textContent = "HOME";
      document.getElementById("divInformation").replaceChildren();
  }
  
  showUser() { 
      document.getElementById("headerTitle").textContent = "USER";

      let table = document.createElement("table");
      table.appendChild(this.tableLine(new User(), true)); 
      this.users.forEach(u => {
          table.appendChild(this.tableLine(u, false));
      });
      document.getElementById("divInformation").replaceChildren(table);
  }

  addUser() { 
      var data = {};
      data.name = document.getElementById("userName").value;
      data.email = document.getElementById("userEmail").value;
      data.phone = document.getElementById("userPhone").value;
      data.password = document.getElementById("userPassword").value;
      data.type = document.getElementById("userType").value;

      var json = JSON.stringify(data);

      let self = this;
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "user", true); 
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      xhr.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
              self.users = JSON.parse(this.responseText).users; 
          }
      };
      xhr.send(json);
  }

  getUsers() { 
      let self = this;
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "user", true); 
      xhr.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
              self.users = JSON.parse(this.responseText).users; 
          }
      };
      xhr.send();
  }

  updateUser(id) { 
      var data = {};
      data.id = document.getElementById("UserId").value; 
      data.name = document.getElementById("userName").value;
      data.email = document.getElementById("userEmail").value;
      data.phone = document.getElementById("userPhone").value;
      data.password = document.getElementById("userPassword").value;
      data.type = document.getElementById("userType").value;

      var json = JSON.stringify(data);

      let self = this;
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", "user/" + id, true); 
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
              self.users = JSON.parse(this.responseText).users; 
          }
      };
      xhr.send(json);
  }

  deleteUser(id) { 
      let self = this;
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", "user/" + id, true); 
      xhr.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
              self.users = JSON.parse(this.responseText).users; 
          }
      };
      xhr.send();
  }

  // Função auxiliar para criar linhas de tabela (a ser implementada)
  tableLine(user, isHeader) { 
      let tr = document.createElement("tr");
      if (isHeader) {
          // Criar linha de cabeçalho
          tr.innerHTML = `<th>Name</th><th>Email</th><th>Phone</th><th>Password</th><th>Type</th>`;
      } else {
          // Criar linha de dados
          tr.innerHTML = `<td>${user.name}</td><td>${user.email}</td><td>${user.phone}</td><td>${user.password}</td><td>${user.type}</td>`;
      }
      return tr;
  }
}
