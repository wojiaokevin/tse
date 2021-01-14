const form = VGSCollect.create("tnt72v2ptmv", 'sandbox', function (state) {});

form.field("#card_number", {
  type: "card-number",
  name: "card_number",
  placeholder: "9999 9999 9999 9999",
  value: "3566000020000410",
  successColor: "#4F8A10",
  errorColor: "#D8000C",
  validations: ["required", "validCardNumber"],
});

form.field("#card_cvc", {
  type: "card-security-code",
  name: "card_cvc",
  value: "123",
  placeholder: "999",
  validations: ["required", "validCardSecurityCode"],
});

form.field("#card_expiration_date", {
  type: "card-expiration-date",
  name: "card_expiration_date",
  placeholder: "01 / 2023",
  value: "02 / 2023",
  validations: ["required", "validCardExpirationDate"],
});

document.getElementById("card_form").addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    form.submit("/post", {}, function (status, data) {
      var redacted = "<div>The redacted card data</div>";
      redacted += "<div>" + JSON.stringify(data.redacted, null, 4) + "</div>";
      var echoed = "<div>The echoed card data</div>";
      echoed += "<div>" + JSON.stringify(data.echoed, null, 4) + "</div>";
      document.getElementById("result").innerHTML = redacted + echoed;
    });
  },
  function (errors) {
    document.getElementById("result").innerHTML = errors;
  }
);
