$(document).ready(function () {

  function calculateSubtotal(row) {
      var quantity = $(row).find('.quantity input').val();
      var price = $(row).find('.price').text().replace('$', '');
      var subtotal = quantity * price;
      $(row).find('.subtotal').text('$' + subtotal.toFixed(2));
      return subtotal;
  }

  function calculateTotal() {
      var total = 0;
      $('#cart-items tr').each(function () {
          total += calculateSubtotal(this);
      });
      $('#totalCart').text('$' + total.toFixed(2));
  }

  $(document).on('input', '.quantity input', function () {
      calculateSubtotal($(this).closest('tr'));
      calculateTotal();
  });

  $(document).on('input', '.price input', function () {
      calculateSubtotal($(this).closest('tr'));
      calculateTotal();
  });

  $('#addItemForm').submit(function (e) {
      e.preventDefault();
      var name = $(this).find('.item').val();
      var quantity = $(this).find('.quantity').val();
      var price = $(this).find('.price').val();
      var row = '<tr>' +
          '<td class="name">' + name + '</td>' +
          '<td class="quantity"><input type="number" min="0" value="' + quantity + '"></td>' +
          '<td class="price">$' + price + '</td>' +
          '<td class="subtotal">$' + (quantity * price).toFixed(2) + '</td>' +
          '<td><button class="btn btn-light btn-sm remove">Remove</button></td>' +
          '</tr>';
      $('#cart-items').append(row);
      calculateTotal();
  });

  $(document).on('click', '.remove', function () {
      $(this).closest('tr').remove();
      calculateTotal();
  });

  calculateTotal();
});
