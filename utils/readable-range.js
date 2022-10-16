// the below code is readable-range.js minified
(function (e) {
  var t = {
    nodiff: "",
    year: "năm",
    years: "năm",
    month: "tháng",
    months: "tháng",
    day: "ngày",
    days: "ngày",
    hour: "giờ",
    hours: "giờ",
    minute: "phút",
    minutes: "phút",
    second: "giây",
    seconds: "giây",
    delimiter: " ",
  };
  e.fn.preciseDiff = function (t) {
    return e.preciseDiff(this, t);
  };
  e.preciseDiff = function (n, r) {
    function d(e, n) {
      return e + " " + t[n + (e === 1 ? "" : "s")];
    }
    var i = e(n),
      s = e(r);
    if (i.isSame(s)) {
      return t.nodiff;
    }
    if (i.isAfter(s)) {
      var o = i;
      i = s;
      s = o;
    }
    var u = s.year() - i.year();
    var a = s.month() - i.month();
    var f = s.date() - i.date();
    var l = s.hour() - i.hour();
    var c = s.minute() - i.minute();
    var h = s.second() - i.second();
    if (h < 0) {
      h = 60 + h;
      c--;
    }
    if (c < 0) {
      c = 60 + c;
      l--;
    }
    if (l < 0) {
      l = 24 + l;
      f--;
    }
    if (f < 0) {
      var p = e(s.year() + "-" + (s.month() + 1), "YYYY-MM")
        .subtract("months", 1)
        .daysInMonth();
      if (p < i.date()) {
        f = p + f + (i.date() - p);
      } else {
        f = p + f;
      }
      a--;
    }
    if (a < 0) {
      a = 12 + a;
      u--;
    }
    var v = [];
    if (u) {
      v.push(d(u, "year"));
    }
    if (a) {
      v.push(d(a, "month"));
    }
    if (f) {
      v.push(d(f, "day"));
    }
    if (l) {
      v.push(d(l, "hour"));
    }
    if (c) {
      v.push(d(c, "minute"));
    }
    if (h) {
      v.push(d(h, "second"));
    }
    return v.join(t.delimiter);
  };
})(moment);
