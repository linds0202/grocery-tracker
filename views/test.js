<div class="profile-container container">
  <div class="row mt-5">
      <div class="col-6"></div>
          <div class="mt-5">
            <h2>Add an Item</h2>
            <form action="/item/createItem" enctype="multipart/form-data" method="POST">
              <div class="mb-3">
                  <label for="item" class="form-label">Item Name</label>
                  <input type="text" class="form-control" id="item" name="item">
              </div>
              <div class="mb-3">
                <label for="prices" class="form-label">Price</label>
                <input type="number" step="0.01" class="form-control" id="prices" name="prices">
              </div>
              <button type="submit" class="btn btn-primary" value="Upload">Submit</button>
            </form>
          </div>
      </div>
      <div class="col-6 item-list">
        <h2>Price History</h2>
        <table >
          <thead>
            <tr>
                <th scope="col">Item</th>
                <th scope="col">Cheapest Price</th>
                <th scope="col">Average Price</th>
                <th scope="col">Most Recent Price</th>
                <th scope="col">Add New Price</th>
                <th scope="col">Add to List</th>
            </tr>
          </thead>
          <tbody>
            <% for(var i=0; i<items.length; i++) {%>
              <tr>
                <th><%= items[i].item %></th>
                <td>$<%= items[i].prices.sort((a, b) => a.price - b.price)[0].price %></td>
                <td>$<%= (items[i].prices.map(price => +price.price).reduce((a, b) =>  a + b) / items[i].prices.length).toFixed(2) %></td>
                <td>$<%= items[i].prices[items[i].prices.length - 1].price %></td>
                <td>
                  <form
                    action="/item/addItemPrice/<%= items[i].id %>?_method=PUT"
                    method="POST"
                    class="col-3"
                  >
                    <input type="number" step="0.01" class="form-control add-price" id="itemPrice" name="itemPrice">
                    <button class="btn btn-primary fa fa-heart" type="submit"></button>
                  </form>
                </td>
                <td>
                  <form
                    action="/item/addItem/<%= items[i].id %>?_method=PUT"
                    method="POST"
                    class="col-3"
                  >
                      <button class="btn btn-primary fa fa-heart" type="submit"></button>
                  </form>
                </td>
                <!-- <span>     (<%= items[i].createdAt.getMonth() %>/<%= items[i].createdAt.getDate() %>/<%= items[i].createdAt.getFullYear() %>)</span> -->
              </tr>
            <% } %>
          </tbody>
        </table>
        <div class="row justify-content-center mt-5">
          <a class="btn btn-primary" href="/feed">Return to Shopping List</a>
        </div>  
      </div>  
    </div>
  </div>
</div>