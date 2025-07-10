import _e, { useRef as ge, useState as k, useEffect as fe } from "react";
import './index.css';var ue = { exports: {} }, le = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pe;
function ke() {
  if (pe) return le;
  pe = 1;
  var d = Symbol.for("react.transitional.element"), u = Symbol.for("react.fragment");
  function n(m, c, x) {
    var j = null;
    if (x !== void 0 && (j = "" + x), c.key !== void 0 && (j = "" + c.key), "key" in c) {
      x = {};
      for (var l in c)
        l !== "key" && (x[l] = c[l]);
    } else x = c;
    return c = x.ref, {
      $$typeof: d,
      type: m,
      key: j,
      ref: c !== void 0 ? c : null,
      props: x
    };
  }
  return le.Fragment = u, le.jsx = n, le.jsxs = n, le;
}
var de = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ye;
function Ce() {
  return ye || (ye = 1, process.env.NODE_ENV !== "production" && function() {
    function d(r) {
      if (r == null) return null;
      if (typeof r == "function")
        return r.$$typeof === T ? null : r.displayName || r.name || null;
      if (typeof r == "string") return r;
      switch (r) {
        case C:
          return "Fragment";
        case W:
          return "Profiler";
        case f:
          return "StrictMode";
        case o:
          return "Suspense";
        case _:
          return "SuspenseList";
        case V:
          return "Activity";
      }
      if (typeof r == "object")
        switch (typeof r.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), r.$$typeof) {
          case s:
            return "Portal";
          case z:
            return (r.displayName || "Context") + ".Provider";
          case E:
            return (r._context.displayName || "Context") + ".Consumer";
          case p:
            var y = r.render;
            return r = r.displayName, r || (r = y.displayName || y.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
          case P:
            return y = r.displayName || null, y !== null ? y : d(r.type) || "Memo";
          case N:
            y = r._payload, r = r._init;
            try {
              return d(r(y));
            } catch {
            }
        }
      return null;
    }
    function u(r) {
      return "" + r;
    }
    function n(r) {
      try {
        u(r);
        var y = !1;
      } catch {
        y = !0;
      }
      if (y) {
        y = console;
        var B = y.error, Y = typeof Symbol == "function" && Symbol.toStringTag && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return B.call(
          y,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          Y
        ), u(r);
      }
    }
    function m(r) {
      if (r === C) return "<>";
      if (typeof r == "object" && r !== null && r.$$typeof === N)
        return "<...>";
      try {
        var y = d(r);
        return y ? "<" + y + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function c() {
      var r = q.A;
      return r === null ? null : r.getOwner();
    }
    function x() {
      return Error("react-stack-top-frame");
    }
    function j(r) {
      if (L.call(r, "key")) {
        var y = Object.getOwnPropertyDescriptor(r, "key").get;
        if (y && y.isReactWarning) return !1;
      }
      return r.key !== void 0;
    }
    function l(r, y) {
      function B() {
        K || (K = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          y
        ));
      }
      B.isReactWarning = !0, Object.defineProperty(r, "key", {
        get: B,
        configurable: !0
      });
    }
    function R() {
      var r = d(this.type);
      return a[r] || (a[r] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), r = this.props.ref, r !== void 0 ? r : null;
    }
    function D(r, y, B, Y, Q, H, ee, re) {
      return B = H.ref, r = {
        $$typeof: t,
        type: r,
        key: y,
        props: H,
        _owner: Q
      }, (B !== void 0 ? B : null) !== null ? Object.defineProperty(r, "ref", {
        enumerable: !1,
        get: R
      }) : Object.defineProperty(r, "ref", { enumerable: !1, value: null }), r._store = {}, Object.defineProperty(r._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(r, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(r, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ee
      }), Object.defineProperty(r, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: re
      }), Object.freeze && (Object.freeze(r.props), Object.freeze(r)), r;
    }
    function $(r, y, B, Y, Q, H, ee, re) {
      var I = y.children;
      if (I !== void 0)
        if (Y)
          if (S(I)) {
            for (Y = 0; Y < I.length; Y++)
              G(I[Y]);
            Object.freeze && Object.freeze(I);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else G(I);
      if (L.call(y, "key")) {
        I = d(r);
        var ie = Object.keys(y).filter(function(h) {
          return h !== "key";
        });
        Y = 0 < ie.length ? "{key: someKey, " + ie.join(": ..., ") + ": ...}" : "{key: someKey}", ae[I + Y] || (ie = 0 < ie.length ? "{" + ie.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          Y,
          I,
          ie,
          I
        ), ae[I + Y] = !0);
      }
      if (I = null, B !== void 0 && (n(B), I = "" + B), j(y) && (n(y.key), I = "" + y.key), "key" in y) {
        B = {};
        for (var oe in y)
          oe !== "key" && (B[oe] = y[oe]);
      } else B = y;
      return I && l(
        B,
        typeof r == "function" ? r.displayName || r.name || "Unknown" : r
      ), D(
        r,
        I,
        H,
        Q,
        c(),
        B,
        ee,
        re
      );
    }
    function G(r) {
      typeof r == "object" && r !== null && r.$$typeof === t && r._store && (r._store.validated = 1);
    }
    var g = _e, t = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), W = Symbol.for("react.profiler"), E = Symbol.for("react.consumer"), z = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), o = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), P = Symbol.for("react.memo"), N = Symbol.for("react.lazy"), V = Symbol.for("react.activity"), T = Symbol.for("react.client.reference"), q = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = Object.prototype.hasOwnProperty, S = Array.isArray, A = console.createTask ? console.createTask : function() {
      return null;
    };
    g = {
      "react-stack-bottom-frame": function(r) {
        return r();
      }
    };
    var K, a = {}, se = g["react-stack-bottom-frame"].bind(
      g,
      x
    )(), O = A(m(x)), ae = {};
    de.Fragment = C, de.jsx = function(r, y, B, Y, Q) {
      var H = 1e4 > q.recentlyCreatedOwnerStacks++;
      return $(
        r,
        y,
        B,
        !1,
        Y,
        Q,
        H ? Error("react-stack-top-frame") : se,
        H ? A(m(r)) : O
      );
    }, de.jsxs = function(r, y, B, Y, Q) {
      var H = 1e4 > q.recentlyCreatedOwnerStacks++;
      return $(
        r,
        y,
        B,
        !0,
        Y,
        Q,
        H ? Error("react-stack-top-frame") : se,
        H ? A(m(r)) : O
      );
    };
  }()), de;
}
var be;
function Fe() {
  return be || (be = 1, process.env.NODE_ENV === "production" ? ue.exports = ke() : ue.exports = Ce()), ue.exports;
}
var e = Fe();
const je = ({ onUpload: d }) => {
  const u = ge(null), n = (c) => {
    const x = c.target.files?.[0];
    if (!x) return;
    const j = new FileReader();
    j.onload = () => {
      d(j.result);
    }, j.readAsDataURL(x);
  }, m = () => {
    u.current?.click();
  };
  return /* @__PURE__ */ e.jsxs("div", { style: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "none",
    border: "none",
    boxShadow: "none",
    padding: 0
  }, children: [
    /* @__PURE__ */ e.jsx(
      "button",
      {
        onClick: m,
        style: {
          padding: "0.5rem 1rem",
          backgroundColor: "#059669",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "0.875rem",
          fontWeight: "500",
          boxShadow: "0 2px 8px rgba(80,60,30,0.08)",
          transition: "background 0.2s"
        },
        onMouseEnter: (c) => c.currentTarget.style.backgroundColor = "#047857",
        onMouseLeave: (c) => c.currentTarget.style.backgroundColor = "#059669",
        children: "사진 선택하기"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "image/*",
        onChange: n,
        style: { display: "none" }
      }
    )
  ] });
}, ne = (d, u, n) => Math.max(u, Math.min(n, d)), ve = { x: 30, y: 30, width: 40, height: 40 }, Ee = ({ photo: d, onWindowSelect: u, hideTitle: n }) => {
  const [m, c] = k(!1), [x, j] = k(null), [l, R] = k(
    d ? ve : null
  ), D = ge(null), [$, G] = k(null), [g, t] = k(null);
  if (!d)
    return /* @__PURE__ */ e.jsx("div", { style: {
      border: "1px solid #e5e7eb",
      padding: "1rem",
      borderRadius: "12px",
      backgroundColor: "#f9fafb",
      textAlign: "center"
    }, children: !n && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx("h3", { style: { fontWeight: "bold", fontSize: "1.125rem", marginBottom: "0.5rem" }, children: "🪟 창 선택" }),
      /* @__PURE__ */ e.jsx("p", { style: { color: "#6b7280", fontSize: "0.875rem" }, children: "사진을 먼저 업로드해주세요" })
    ] }) });
  const s = (p) => {
    if (!D.current) return { x: 0, y: 0 };
    const o = D.current.getBoundingClientRect(), _ = (p.clientX - o.left) / o.width * 100, P = (p.clientY - o.top) / o.height * 100;
    return { x: Math.max(0, Math.min(100, _)), y: Math.max(0, Math.min(100, P)) };
  }, C = (p) => {
    const o = s(p);
    j(o), c(!0);
  }, f = (p) => (o) => {
    o.stopPropagation(), G(p), c(!0), j(s(o));
  }, W = (p) => {
    if (!l) return;
    p.stopPropagation(), c(!0), G(null);
    const o = s(p);
    t({
      x: o.x - l.x,
      y: o.y - l.y
    });
  }, E = (p) => {
    if (!m) return;
    const o = s(p);
    if ($ && l && x) {
      let { x: _, y: P, width: N, height: V } = l;
      const T = 5;
      let q = _, L = P, S = N, A = V;
      $.includes("n") && (A = ne(V + (P - o.y), T, 100 - P), L = ne(o.y, 0, P + V - T)), $.includes("s") && (A = ne(o.y - P, T, 100 - P)), $.includes("w") && (S = ne(N + (_ - o.x), T, 100 - _), q = ne(o.x, 0, _ + N - T)), $.includes("e") && (S = ne(o.x - _, T, 100 - _)), R({ x: q, y: L, width: S, height: A }), u && u({ x: q, y: L, width: S, height: A });
    } else if (m && g && l) {
      let _ = ne(o.x - g.x, 0, 100 - l.width), P = ne(o.y - g.y, 0, 100 - l.height);
      R({ ...l, x: _, y: P }), u && u({ ...l, x: _, y: P });
    } else if (m && x) {
      const _ = o, P = Math.min(x.x, _.x), N = Math.min(x.y, _.y), V = Math.abs(_.x - x.x), T = Math.abs(_.y - x.y);
      R({ x: P, y: N, width: V, height: T });
    }
  }, z = () => {
    m && l && u && u(l), c(!1), G(null), j(null), t(null);
  };
  return fe(() => {
    if (!m) return;
    const p = (_) => E(_), o = () => z();
    return window.addEventListener("mousemove", p), window.addEventListener("mouseup", o), () => {
      window.removeEventListener("mousemove", p), window.removeEventListener("mouseup", o);
    };
  }, [m]), fe(() => {
    R(d ? ve : null);
  }, [d]), /* @__PURE__ */ e.jsxs("div", { style: {
    border: "1px solid #e5e7eb",
    padding: "1rem",
    borderRadius: "12px",
    backgroundColor: "white"
  }, children: [
    !n && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx("h3", { style: { fontWeight: "bold", fontSize: "1.125rem", marginBottom: "0.5rem" }, children: "🪟 창 선택" }),
      /* @__PURE__ */ e.jsx("p", { style: { color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem" }, children: "사진에서 창이 있는 위치를 클릭하거나 드래그하여 선택하세요" })
    ] }),
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: { position: "relative", width: "100%", maxWidth: "600px", margin: "0 auto" },
        onMouseMove: E,
        onMouseUp: z,
        onMouseLeave: z,
        children: [
          /* @__PURE__ */ e.jsx(
            "img",
            {
              ref: D,
              src: d,
              alt: "업로드된 사진",
              style: {
                width: "100%",
                display: "block",
                cursor: m ? "crosshair" : "pointer",
                borderRadius: "8px",
                userSelect: "none"
              },
              onClick: C,
              onMouseDown: C
            }
          ),
          l && /* @__PURE__ */ e.jsxs(
            "div",
            {
              style: {
                position: "absolute",
                left: `${l.x}%`,
                top: `${l.y}%`,
                width: `${l.width}%`,
                height: `${l.height}%`,
                border: "2.5px solid #1d4ed8",
                boxSizing: "border-box",
                borderRadius: "8px",
                background: m ? "rgba(37,99,235,0.18)" : "rgba(37,99,235,0.12)",
                cursor: $ ? `${$}-resize` : "move",
                zIndex: 2,
                transition: "box-shadow 0.2s",
                boxShadow: m ? "0 0 0 3px #1d4ed888" : "0 2px 12px rgba(30,64,175,0.10)",
                userSelect: "none"
              },
              onMouseDown: W,
              children: [
                /* @__PURE__ */ e.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: 0,
                      top: -6,
                      width: "100%",
                      height: 12,
                      cursor: "ns-resize",
                      zIndex: 3
                    },
                    onMouseDown: (p) => f("n")(p)
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: 0,
                      bottom: -6,
                      width: "100%",
                      height: 12,
                      cursor: "ns-resize",
                      zIndex: 3
                    },
                    onMouseDown: (p) => f("s")(p)
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: -6,
                      top: 0,
                      width: 12,
                      height: "100%",
                      cursor: "ew-resize",
                      zIndex: 3
                    },
                    onMouseDown: (p) => f("w")(p)
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      right: -6,
                      top: 0,
                      width: 12,
                      height: "100%",
                      cursor: "ew-resize",
                      zIndex: 3
                    },
                    onMouseDown: (p) => f("e")(p)
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: -8,
                      top: -8,
                      width: 16,
                      height: 16,
                      cursor: "nwse-resize",
                      zIndex: 4
                    },
                    onMouseDown: (p) => f("nw")(p)
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      right: -8,
                      top: -8,
                      width: 16,
                      height: 16,
                      cursor: "nesw-resize",
                      zIndex: 4
                    },
                    onMouseDown: (p) => f("ne")(p)
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: -8,
                      bottom: -8,
                      width: 16,
                      height: 16,
                      cursor: "nesw-resize",
                      zIndex: 4
                    },
                    onMouseDown: (p) => f("sw")(p)
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      right: -8,
                      bottom: -8,
                      width: 16,
                      height: 16,
                      cursor: "nwse-resize",
                      zIndex: 4
                    },
                    onMouseDown: (p) => f("se")(p)
                  }
                )
              ]
            }
          ),
          m && x && !$ && /* @__PURE__ */ e.jsx(
            "div",
            {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                pointerEvents: "none",
                zIndex: 0
              }
            }
          )
        ]
      }
    )
  ] });
}, Be = [
  // 기본색 (10개)
  { id: "white", name: "화이트", hex: "#FFFFFF", category: "기본색" },
  { id: "black", name: "블랙", hex: "#000000", category: "기본색" },
  { id: "gray", name: "그레이", hex: "#808080", category: "기본색" },
  { id: "red", name: "레드", hex: "#FF0000", category: "기본색" },
  { id: "blue", name: "블루", hex: "#0000FF", category: "기본색" },
  { id: "green", name: "그린", hex: "#008000", category: "기본색" },
  { id: "yellow", name: "옐로우", hex: "#FFFF00", category: "기본색" },
  { id: "purple", name: "퍼플", hex: "#800080", category: "기본색" },
  { id: "orange", name: "오렌지", hex: "#FFA500", category: "기본색" },
  { id: "pink", name: "핑크", hex: "#FFC0CB", category: "기본색" },
  // 파스텔 (20개)
  { id: "pastel_blue", name: "파스텔블루", hex: "#B0E0E6", category: "파스텔" },
  { id: "pastel_pink", name: "파스텔핑크", hex: "#FFB6C1", category: "파스텔" },
  { id: "pastel_green", name: "파스텔그린", hex: "#98FB98", category: "파스텔" },
  { id: "pastel_yellow", name: "파스텔옐로우", hex: "#F0E68C", category: "파스텔" },
  { id: "pastel_lavender", name: "파스텔라벤더", hex: "#E6E6FA", category: "파스텔" },
  { id: "pastel_peach", name: "파스텔피치", hex: "#FFDAB9", category: "파스텔" },
  { id: "pastel_mint", name: "파스텔민트", hex: "#F5FFFA", category: "파스텔" },
  { id: "pastel_coral", name: "파스텔코랄", hex: "#FF7F50", category: "파스텔" },
  { id: "pastel_sage", name: "파스텔세이지", hex: "#BCB88A", category: "파스텔" },
  { id: "pastel_rose", name: "파스텔로즈", hex: "#FFE4E1", category: "파스텔" },
  { id: "pastel_sky", name: "파스텔스카이", hex: "#87CEEB", category: "파스텔" },
  { id: "pastel_lime", name: "파스텔라임", hex: "#32CD32", category: "파스텔" },
  { id: "pastel_orange", name: "파스텔오렌지", hex: "#FFB347", category: "파스텔" },
  { id: "pastel_violet", name: "파스텔바이올렛", hex: "#DDA0DD", category: "파스텔" },
  { id: "pastel_cream", name: "파스텔크림", hex: "#FFFDD0", category: "파스텔" },
  { id: "pastel_aqua", name: "파스텔아쿠아", hex: "#7FFFD4", category: "파스텔" },
  { id: "pastel_gold", name: "파스텔골드", hex: "#F4E4BC", category: "파스텔" },
  { id: "pastel_silver", name: "파스텔실버", hex: "#E8E8E8", category: "파스텔" },
  { id: "pastel_bronze", name: "파스텔브론즈", hex: "#CD853F", category: "파스텔" },
  { id: "pastel_copper", name: "파스텔구리", hex: "#B87333", category: "파스텔" },
  // 따뜻한색 (15개)
  { id: "warm_beige", name: "베이지", hex: "#F5F5DC", category: "따뜻한색" },
  { id: "warm_cream", name: "크림", hex: "#FFFDD0", category: "따뜻한색" },
  { id: "warm_ivory", name: "아이보리", hex: "#FFFFF0", category: "따뜻한색" },
  { id: "warm_brown", name: "브라운", hex: "#8B4513", category: "따뜻한색" },
  { id: "warm_bronze", name: "브론즈", hex: "#CD7F32", category: "따뜻한색" },
  { id: "warm_copper", name: "구리", hex: "#B87333", category: "따뜻한색" },
  { id: "warm_gold", name: "골드", hex: "#FFD700", category: "따뜻한색" },
  { id: "warm_amber", name: "앰버", hex: "#FFBF00", category: "따뜻한색" },
  { id: "warm_terracotta", name: "테라코타", hex: "#E2725B", category: "따뜻한색" },
  { id: "warm_rust", name: "러스트", hex: "#B7410E", category: "따뜻한색" },
  { id: "warm_sand", name: "샌드", hex: "#F4A460", category: "따뜻한색" },
  { id: "warm_tan", name: "탄", hex: "#D2B48C", category: "따뜻한색" },
  { id: "warm_peach", name: "피치", hex: "#FFCBA4", category: "따뜻한색" },
  { id: "warm_coral", name: "코랄", hex: "#FF7F50", category: "따뜻한색" },
  { id: "warm_salmon", name: "새먼", hex: "#FA8072", category: "따뜻한색" },
  // 차가운색 (15개)
  { id: "cool_navy", name: "네이비", hex: "#000080", category: "차가운색" },
  { id: "cool_darkgray", name: "다크그레이", hex: "#2F4F4F", category: "차가운색" },
  { id: "cool_charcoal", name: "차콜", hex: "#36454F", category: "차가운색" },
  { id: "cool_deepblue", name: "딥블루", hex: "#191970", category: "차가운색" },
  { id: "cool_teal", name: "틸", hex: "#008080", category: "차가운색" },
  { id: "cool_slate", name: "슬레이트", hex: "#708090", category: "차가운색" },
  { id: "cool_steel", name: "스틸", hex: "#4682B4", category: "차가운색" },
  { id: "cool_cyan", name: "시안", hex: "#00FFFF", category: "차가운색" },
  { id: "cool_indigo", name: "인디고", hex: "#4B0082", category: "차가운색" },
  { id: "cool_plum", name: "플럼", hex: "#8B4513", category: "차가운색" },
  { id: "cool_burgundy", name: "버건디", hex: "#800020", category: "차가운색" },
  { id: "cool_forest", name: "포레스트", hex: "#228B22", category: "차가운색" },
  { id: "cool_emerald", name: "에메랄드", hex: "#50C878", category: "차가운색" },
  { id: "cool_jade", name: "제이드", hex: "#00A86B", category: "차가운색" },
  { id: "cool_olive", name: "올리브", hex: "#808000", category: "차가운색" },
  // 중성색 (15개)
  { id: "neutral_lightgray", name: "라이트그레이", hex: "#D3D3D3", category: "중성색" },
  { id: "neutral_silver", name: "실버", hex: "#C0C0C0", category: "중성색" },
  { id: "neutral_offwhite", name: "오프화이트", hex: "#F5F5F5", category: "중성색" },
  { id: "neutral_antiquewhite", name: "앤틱화이트", hex: "#FAEBD7", category: "중성색" },
  { id: "neutral_eggshell", name: "에그쉘", hex: "#F0EAD6", category: "중성색" },
  { id: "neutral_linen", name: "리넨", hex: "#FAF0E6", category: "중성색" },
  { id: "neutral_pearl", name: "펄", hex: "#F0EAD6", category: "중성색" },
  { id: "neutral_ivory", name: "아이보리", hex: "#FFFFF0", category: "중성색" },
  { id: "neutral_cream", name: "크림", hex: "#FFFDD0", category: "중성색" },
  { id: "neutral_beige", name: "베이지", hex: "#F5F5DC", category: "중성색" },
  { id: "neutral_taupe", name: "토프", hex: "#483C32", category: "중성색" },
  { id: "neutral_greige", name: "그레이지", hex: "#B8B8A8", category: "중성색" },
  { id: "neutral_mushroom", name: "머시룸", hex: "#C4A484", category: "중성색" },
  { id: "neutral_stone", name: "스톤", hex: "#8A8A8A", category: "중성색" },
  { id: "neutral_ash", name: "애쉬", hex: "#B2BEB5", category: "중성색" },
  // 브라이트 (15개)
  { id: "bright_red", name: "브라이트레드", hex: "#FF1744", category: "브라이트" },
  { id: "bright_blue", name: "브라이트블루", hex: "#2196F3", category: "브라이트" },
  { id: "bright_green", name: "브라이트그린", hex: "#4CAF50", category: "브라이트" },
  { id: "bright_yellow", name: "브라이트옐로우", hex: "#FFEB3B", category: "브라이트" },
  { id: "bright_orange", name: "브라이트오렌지", hex: "#FF9800", category: "브라이트" },
  { id: "bright_pink", name: "브라이트핑크", hex: "#E91E63", category: "브라이트" },
  { id: "bright_purple", name: "브라이트퍼플", hex: "#9C27B0", category: "브라이트" },
  { id: "bright_cyan", name: "브라이트시안", hex: "#00BCD4", category: "브라이트" },
  { id: "bright_lime", name: "브라이트라임", hex: "#CDDC39", category: "브라이트" },
  { id: "bright_magenta", name: "브라이트마젠타", hex: "#F44336", category: "브라이트" },
  { id: "bright_teal", name: "브라이트틸", hex: "#009688", category: "브라이트" },
  { id: "bright_indigo", name: "브라이트인디고", hex: "#3F51B5", category: "브라이트" },
  { id: "bright_amber", name: "브라이트앰버", hex: "#FFC107", category: "브라이트" },
  { id: "bright_deeppurple", name: "브라이트딥퍼플", hex: "#673AB7", category: "브라이트" },
  { id: "bright_lightgreen", name: "브라이트라이트그린", hex: "#8BC34A", category: "브라이트" },
  // 어두운색 (10개)
  { id: "dark_black", name: "다크블랙", hex: "#1A1A1A", category: "어두운색" },
  { id: "dark_charcoal", name: "다크차콜", hex: "#2C2C2C", category: "어두운색" },
  { id: "dark_navy", name: "다크네이비", hex: "#000080", category: "어두운색" },
  { id: "dark_burgundy", name: "다크버건디", hex: "#800020", category: "어두운색" },
  { id: "dark_forest", name: "다크포레스트", hex: "#228B22", category: "어두운색" },
  { id: "dark_brown", name: "다크브라운", hex: "#654321", category: "어두운색" },
  { id: "dark_gray", name: "다크그레이", hex: "#404040", category: "어두운색" },
  { id: "dark_olive", name: "다크올리브", hex: "#556B2F", category: "어두운색" },
  { id: "dark_maroon", name: "다크마룬", hex: "#800000", category: "어두운색" },
  { id: "dark_slate", name: "다크슬레이트", hex: "#2F4F4F", category: "어두운색" }
];
function we(d) {
  const u = d.replace("#", ""), n = parseInt(u.substring(0, 2), 16), m = parseInt(u.substring(2, 4), 16), c = parseInt(u.substring(4, 6), 16);
  return 0.299 * n + 0.587 * m + 0.114 * c;
}
const Re = [...Be].sort((d, u) => we(u.hex) - we(d.hex)), De = ({ selectedColor: d, onColorSelect: u, hideLabel: n }) => {
  const [m, c] = k(1), [x, j] = k(null);
  function l(D, $) {
    let G = D.replace("#", ""), g = parseInt(G.substring(0, 2), 16), t = parseInt(G.substring(2, 4), 16), s = parseInt(G.substring(4, 6), 16);
    return g = Math.round(Math.min(255, Math.max(0, g * $))), t = Math.round(Math.min(255, Math.max(0, t * $))), s = Math.round(Math.min(255, Math.max(0, s * $))), `#${g.toString(16).padStart(2, "0")}${t.toString(16).padStart(2, "0")}${s.toString(16).padStart(2, "0")}`;
  }
  const R = x ? l(x.hex, m) : d ? d.hex : "#fff";
  return /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: "1rem" }, children: [
    !n && /* @__PURE__ */ e.jsx("label", { style: { fontWeight: 600, display: "block", marginBottom: 6 }, children: "색상 선택" }),
    /* @__PURE__ */ e.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.12em", margin: "0.2em 0" }, children: Re.map((D) => /* @__PURE__ */ e.jsx(
      "button",
      {
        onClick: () => {
          c(1), j(D), u(D);
        },
        style: {
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: d?.hex === D.hex ? "2.5px solid var(--color-primary)" : "2px solid var(--color-border)",
          margin: "0.08em",
          background: D.hex,
          boxShadow: d?.hex === D.hex ? "0 2px 8px rgba(191,174,158,0.18)" : "0 1px 4px rgba(0,0,0,0.04)",
          cursor: "pointer",
          outline: "none",
          transition: "border 0.2s, box-shadow 0.2s",
          padding: 0
        },
        "aria-label": D.name
      },
      D.hex
    )) }),
    (x || d) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }, children: [
        /* @__PURE__ */ e.jsx("span", { style: { fontSize: 13, color: "#6b7280" }, children: "어둡게" }),
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "range",
            min: 0.5,
            max: 1.5,
            step: 0.01,
            value: m,
            onChange: (D) => {
              const $ = Number(D.target.value);
              c($), x ? u({ ...x, hex: l(x.hex, $) }) : d && u({ ...d, hex: l(d.hex, $) });
            },
            style: { flex: 1 }
          }
        ),
        /* @__PURE__ */ e.jsx("span", { style: { fontSize: 13, color: "#6b7280" }, children: "밝게" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { style: { marginTop: 8, display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ e.jsx(
          "span",
          {
            style: {
              display: "inline-block",
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: R,
              border: "1px solid #d1d5db"
            }
          }
        ),
        /* @__PURE__ */ e.jsx("span", { style: { fontWeight: 500 }, children: x?.name ?? d?.name }),
        /* @__PURE__ */ e.jsx("span", { style: { color: "#6b7280", fontSize: 12 }, children: R })
      ] })
    ] })
  ] });
}, Me = ({
  blindType: d,
  state: u,
  color: n,
  width: m,
  height: c
}) => {
  const x = () => {
    const l = {
      width: `${m}%`,
      height: `${c}%`,
      position: "absolute",
      top: 0,
      left: 0
    };
    switch (d) {
      case "알루미늄블라인드":
        return {
          ...l,
          background: `repeating-linear-gradient(
            0deg,
            ${n} 0px,
            ${n} 8px,
            ${Z(n, -20)} 8px,
            ${Z(n, -20)} 16px
          )`,
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)"
        };
      case "우드블라인드":
        return {
          ...l,
          background: `repeating-linear-gradient(
            0deg,
            ${n} 0px,
            ${n} 12px,
            ${Z(n, -30)} 12px,
            ${Z(n, -30)} 24px
          )`,
          boxShadow: "inset 0 0 15px rgba(0,0,0,0.2)"
        };
      case "콤비블라인드":
        return {
          ...l,
          background: `repeating-linear-gradient(
            0deg,
            ${n} 0px,
            ${n} 6px,
            ${Z(n, -15)} 6px,
            ${Z(n, -15)} 12px
          )`,
          boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)"
        };
      case "롤블라인드":
        return {
          ...l,
          background: `linear-gradient(
            180deg,
            ${Z(n, -10)} 0%,
            ${n} 20%,
            ${n} 80%,
            ${Z(n, -10)} 100%
          )`,
          borderRadius: "4px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
        };
      case "암막롤블라인드":
        return {
          ...l,
          background: n,
          borderRadius: "4px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
        };
      case "3d쉐이드":
        return {
          ...l,
          background: `repeating-linear-gradient(
            45deg,
            ${n} 0px,
            ${n} 4px,
            ${Z(n, -25)} 4px,
            ${Z(n, -25)} 8px
          )`,
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.15)"
        };
      case "루미넷쉐이드":
        return {
          ...l,
          background: `radial-gradient(
            circle at 50% 50%,
            ${Z(n, 20)} 0%,
            ${n} 70%,
            ${Z(n, -20)} 100%
          )`,
          boxShadow: "inset 0 0 15px rgba(0,0,0,0.1)"
        };
      case "허니콤쉐이드":
        return {
          ...l,
          background: `repeating-linear-gradient(
            60deg,
            ${n} 0px,
            ${n} 10px,
            ${Z(n, -20)} 10px,
            ${Z(n, -20)} 20px
          )`,
          boxShadow: "inset 0 0 12px rgba(0,0,0,0.1)"
        };
      case "베네시안블라인드":
        return {
          ...l,
          background: `repeating-linear-gradient(
            0deg,
            ${n} 0px,
            ${n} 15px,
            ${Z(n, -40)} 15px,
            ${Z(n, -40)} 30px
          )`,
          boxShadow: "inset 0 0 25px rgba(0,0,0,0.2)"
        };
      default:
        return {
          ...l,
          backgroundColor: n
        };
    }
  }, j = () => {
    switch (u) {
      case "open":
        return {
          opacity: 0.1,
          transform: "translateY(-80%)"
        };
      case "half":
        return {
          opacity: 0.6,
          transform: "translateY(-40%)"
        };
      case "closed":
        return {
          opacity: 1,
          transform: "translateY(0%)"
        };
      default:
        return {};
    }
  };
  return /* @__PURE__ */ e.jsx(
    "div",
    {
      style: {
        ...x(),
        ...j(),
        transition: "all 0.3s ease-in-out"
      }
    }
  );
}, Z = (d, u) => {
  const n = parseInt(d.replace("#", ""), 16), m = Math.round(2.55 * u), c = (n >> 16) + m, x = (n >> 8 & 255) + m, j = (n & 255) + m;
  return "#" + (16777216 + (c < 255 ? c < 1 ? 0 : c : 255) * 65536 + (x < 255 ? x < 1 ? 0 : x : 255) * 256 + (j < 255 ? j < 1 ? 0 : j : 255)).toString(16).slice(1);
}, Pe = ({
  pleatType: d,
  curtainOpen: u,
  color: n,
  width: m,
  height: c,
  waveCount: x = 10,
  waveDepth: j = 18,
  opacity: l = 0.95,
  fabricType: R = "plain",
  openingStyle: D = "양개",
  perspectiveAngle: $ = 5,
  depthIntensity: G = 1,
  materialType: g = "plain",
  patternScale: t = 8,
  patternOpacity: s = 0.45,
  patternAngle: C = 0,
  patternOffset: f = 0,
  colorLightness: W = 0,
  colorSaturation: E = 0,
  colorHue: z = 0,
  pleatContrast: p = 1
}) => {
  const o = _e.useMemo(() => {
    let h = n;
    return z !== 0 && (h = B(h, z)), E !== 0 && (h = y(h, E)), W !== 0 && (h = v(h, W)), h;
  }, [n, z, E, W]), _ = `linenTexture_${t}_${s}_${C}_${f}_${W}_${E}_${z}`, P = `suedeTexture_${t}_${s}_${C}_${f}_${W}_${E}_${z}`, N = `squarePattern_${t}_${s}_${C}_${f}_${W}_${E}_${z}`, V = `dotPattern_${t}_${s}_${C}_${f}_${W}_${E}_${z}`, T = `herringbonePattern_${t}_${s}_${C}_${f}_${W}_${E}_${z}`, q = `stripePattern_${t}_${s}_${C}_${f}_${W}_${E}_${z}`, L = `wavePattern_${t}_${s}_${C}_${f}_${W}_${E}_${z}`, S = `tweedPattern_${t}_${s}_${C}_${f}_${W}_${E}_${z}`, A = `checkPattern_${t}_${s}_${C}_${f}_${W}_${E}_${z}`, K = (h = !1) => {
    const M = D === "편개", i = 15;
    if (M)
      return `inset(0 ${100 - (100 - i) * (u / 100)}% 0 0)`;
    {
      const b = 50 - (50 - i) * (u / 100), w = 50 - (50 - i) * (u / 100);
      return h ? `inset(0 ${b}% 0 0)` : `inset(0 0 0 ${w}%)`;
    }
  }, a = (h = 0) => {
    const b = x, w = j * G, X = h * 2 * G, F = 0;
    let J = `M0,${F} `;
    for (let U = 0; U < b; U++) {
      const te = 100 / b * U, he = 100 / b * (U + 0.5), ce = 100 / b * (U + 1), xe = F, $e = 0.5 + 0.5 * Math.sin(Math.PI * ((te + ce) / (2 * 100)));
      let me = F + (d === "나비" ? U % 2 === 0 ? w * 1.2 : w * 0.7 : w) * $e;
      me += X, J += `Q${he},${me} ${ce},${xe} `;
    }
    return J += "V100 H0 Z", J;
  }, se = () => {
    const i = x, b = j * 1.7 * G, w = 0;
    let X = `M0,${w} `;
    for (let F = 0; F < i; F++) {
      const J = 100 / i * F, U = 100 / i * (F + 0.5), te = 100 / i * (F + 1), he = w, ce = 0.5 + 0.5 * Math.sin(Math.PI * ((J + te) / (2 * 100))), xe = d === "나비" ? F % 2 === 0 ? b * 1.2 : b * 1.1 : F % 2 === 0 ? b : b * 1.1;
      X += `Q${U},${he + xe * ce} ${te},${he} `;
    }
    return X += "V100 H0 Z", X;
  };
  function O(h) {
    const M = h.replace("#", ""), i = parseInt(M.substring(0, 2), 16), b = parseInt(M.substring(2, 4), 16), w = parseInt(M.substring(4, 6), 16);
    return 0.299 * i + 0.587 * b + 0.114 * w;
  }
  function ae(h) {
    let M = 0, i = 0, b = 0;
    h.length === 4 ? (M = parseInt(h[1] + h[1], 16), i = parseInt(h[2] + h[2], 16), b = parseInt(h[3] + h[3], 16)) : h.length === 7 && (M = parseInt(h[1] + h[2], 16), i = parseInt(h[3] + h[4], 16), b = parseInt(h[5] + h[6], 16)), M /= 255, i /= 255, b /= 255;
    const w = Math.max(M, i, b), X = Math.min(M, i, b);
    let F = 0, J = 0, U = (w + X) / 2;
    if (w !== X) {
      const te = w - X;
      switch (J = U > 0.5 ? te / (2 - w - X) : te / (w + X), w) {
        case M:
          F = (i - b) / te + (i < b ? 6 : 0);
          break;
        case i:
          F = (b - M) / te + 2;
          break;
        case b:
          F = (M - i) / te + 4;
          break;
      }
      F /= 6;
    }
    return { h: F * 360, s: J * 100, l: U * 100 };
  }
  function r(h, M, i) {
    M /= 100, i /= 100;
    let b = (1 - Math.abs(2 * i - 1)) * M, w = b * (1 - Math.abs(h / 60 % 2 - 1)), X = i - b / 2, F = 0, J = 0, U = 0;
    return 0 <= h && h < 60 ? (F = b, J = w, U = 0) : 60 <= h && h < 120 ? (F = w, J = b, U = 0) : 120 <= h && h < 180 ? (F = 0, J = b, U = w) : 180 <= h && h < 240 ? (F = 0, J = w, U = b) : 240 <= h && h < 300 ? (F = w, J = 0, U = b) : 300 <= h && h < 360 && (F = b, J = 0, U = w), F = Math.round((F + X) * 255), J = Math.round((J + X) * 255), U = Math.round((U + X) * 255), "#" + ((1 << 24) + (F << 16) + (J << 8) + U).toString(16).slice(1);
  }
  function y(h, M) {
    const i = ae(h);
    return i.s = Math.max(0, Math.min(100, i.s + M)), r(i.h, i.s, i.l);
  }
  function B(h, M) {
    const i = ae(h);
    return i.h = (i.h + M + 360) % 360, r(i.h, i.s, i.l);
  }
  const Y = () => {
    O(o);
    const h = v(o, -40 * p), M = v(o, 30 * p), i = [], b = x;
    for (let w = 0; w <= b; w++) {
      const X = w / b * 100, F = w % 2 === 1;
      i.push(
        /* @__PURE__ */ e.jsx(
          "stop",
          {
            offset: `${X}%`,
            stopColor: F ? h : M,
            stopOpacity: F ? 1 : 0.9
          },
          w
        )
      );
    }
    return /* @__PURE__ */ e.jsx("linearGradient", { id: "pleatGrad", x1: "0", y1: "0", x2: "1", y2: "0", children: i });
  }, Q = /* @__PURE__ */ e.jsxs("defs", { children: [
    /* @__PURE__ */ e.jsxs("linearGradient", { id: "curtainGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: o, stopOpacity: R === "sheer" ? 0.7 : 0.95 }),
      /* @__PURE__ */ e.jsx("stop", { offset: "50%", stopColor: o, stopOpacity: R === "sheer" ? 0.6 : 0.9 }),
      /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: "#fff", stopOpacity: R === "sheer" ? 0.18 : 0.45 })
    ] }),
    /* @__PURE__ */ e.jsxs("linearGradient", { id: "topShadow", x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: "#000", stopOpacity: O(o) > 220 ? 0.38 : O(o) > 180 ? 0.28 : O(o) > 120 ? 0.18 : 0.12 }),
      /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: "#000", stopOpacity: "0" })
    ] }),
    /* @__PURE__ */ e.jsxs("linearGradient", { id: "depthGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: o, stopOpacity: "0.8" }),
      /* @__PURE__ */ e.jsx("stop", { offset: "30%", stopColor: o, stopOpacity: "0.6" }),
      /* @__PURE__ */ e.jsx("stop", { offset: "70%", stopColor: o, stopOpacity: "0.4" }),
      /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: o, stopOpacity: "0.2" })
    ] }),
    /* @__PURE__ */ e.jsxs("linearGradient", { id: "shadowGrad", x1: "0", y1: "0", x2: "1", y2: "0", children: [
      /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: "rgba(0,0,0,0.4)" }),
      /* @__PURE__ */ e.jsx("stop", { offset: "20%", stopColor: "rgba(0,0,0,0.2)" }),
      /* @__PURE__ */ e.jsx("stop", { offset: "80%", stopColor: "rgba(0,0,0,0.2)" }),
      /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: "rgba(0,0,0,0.4)" })
    ] }),
    /* @__PURE__ */ e.jsxs("linearGradient", { id: "highlightGrad", x1: "0", y1: "0", x2: "1", y2: "0", children: [
      /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: "rgba(255,255,255,0.1)" }),
      /* @__PURE__ */ e.jsx("stop", { offset: "50%", stopColor: "rgba(255,255,255,0.3)" }),
      /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: "rgba(255,255,255,0.1)" })
    ] }),
    /* @__PURE__ */ e.jsxs("pattern", { id: "sheerTexture", width: "4", height: "4", patternUnits: "userSpaceOnUse", children: [
      /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: "2", height: "4", fill: "#fff", opacity: "0.05" }),
      /* @__PURE__ */ e.jsx("rect", { x: "2", y: "0", width: "2", height: "4", fill: "#fff", opacity: "0.03" })
    ] }),
    /* @__PURE__ */ e.jsxs(
      "pattern",
      {
        id: _,
        width: t,
        height: t,
        patternUnits: "userSpaceOnUse",
        patternTransform: `rotate(${C}) translate(${f},${f})`,
        children: [
          /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: t / 8, height: t, fill: v(o, 30), opacity: s * 0.8 }),
          /* @__PURE__ */ e.jsx("rect", { x: t / 2, y: "0", width: t / 12, height: t, fill: v(o, 10), opacity: s * 0.7 }),
          /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: t, height: t / 10, fill: v(o, 20), opacity: s * 0.6 }),
          /* @__PURE__ */ e.jsx("rect", { x: "0", y: t / 2, width: t, height: t / 14, fill: v(o, 0), opacity: s * 0.5 }),
          /* @__PURE__ */ e.jsx("circle", { cx: t / 3, cy: t / 2, r: t / 32, fill: v(o, -20), opacity: s * 0.4 }),
          /* @__PURE__ */ e.jsx("circle", { cx: t * 0.8, cy: t * 0.7, r: t / 36, fill: v(o, -10), opacity: s * 0.3 })
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs("filter", { id: "noise", x: "0", y: "0", width: "100%", height: "100%", children: [
      /* @__PURE__ */ e.jsx("feTurbulence", { type: "fractalNoise", baseFrequency: "1.2", numOctaves: "3", result: "turb" }),
      /* @__PURE__ */ e.jsx("feColorMatrix", { type: "saturate", values: "0" }),
      /* @__PURE__ */ e.jsx("feComponentTransfer", { children: /* @__PURE__ */ e.jsx("feFuncA", { type: "linear", slope: "0.06" }) })
    ] }),
    /* @__PURE__ */ e.jsxs("filter", { id: "depthShadow", x: "-50%", y: "-50%", width: "200%", height: "200%", children: [
      /* @__PURE__ */ e.jsx("feDropShadow", { dx: "3", dy: "6", stdDeviation: "4", floodColor: "rgba(0,0,0,0.3)" }),
      /* @__PURE__ */ e.jsx("feDropShadow", { dx: "1", dy: "2", stdDeviation: "2", floodColor: "rgba(0,0,0,0.2)" })
    ] }),
    /* @__PURE__ */ e.jsx("filter", { id: "softShadow", x: "-20%", y: "-20%", width: "140%", height: "140%", children: /* @__PURE__ */ e.jsx("feDropShadow", { dx: "2", dy: "4", stdDeviation: "3", floodColor: "rgba(0,0,0,0.2)" }) }),
    /* @__PURE__ */ e.jsxs("pattern", { id: P, width: t, height: t, patternUnits: "userSpaceOnUse", patternTransform: `rotate(${C}) translate(${f},${f})`, children: [
      /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: t, height: t, fill: v(o, 20), opacity: s * 0.6 }),
      /* @__PURE__ */ e.jsx("circle", { cx: t / 2, cy: t / 2, r: t / 3, fill: v(o, 40), opacity: s * 0.8 }),
      /* @__PURE__ */ e.jsx("circle", { cx: t / 4, cy: t / 4, r: t / 6, fill: v(o, 60), opacity: s * 0.5 }),
      /* @__PURE__ */ e.jsx("circle", { cx: t * 3 / 4, cy: t * 3 / 4, r: t / 8, fill: v(o, 50), opacity: s * 0.4 })
    ] }),
    /* @__PURE__ */ e.jsxs("filter", { id: "suedeNoise", x: "0", y: "0", width: "100%", height: "100%", children: [
      /* @__PURE__ */ e.jsx("feTurbulence", { type: "fractalNoise", baseFrequency: "0.7", numOctaves: "2", result: "turb" }),
      /* @__PURE__ */ e.jsx("feColorMatrix", { type: "saturate", values: "0.2" }),
      /* @__PURE__ */ e.jsx("feComponentTransfer", { children: /* @__PURE__ */ e.jsx("feFuncA", { type: "linear", slope: "0.15" }) })
    ] }),
    /* @__PURE__ */ e.jsxs("linearGradient", { id: "velvetGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ e.jsx("stop", { offset: "0%", stopColor: "#fff", stopOpacity: "0.25" }),
      /* @__PURE__ */ e.jsx("stop", { offset: "40%", stopColor: "#000", stopOpacity: "0.25" }),
      /* @__PURE__ */ e.jsx("stop", { offset: "100%", stopColor: "#000", stopOpacity: "0.45" })
    ] }),
    /* @__PURE__ */ e.jsxs("pattern", { id: N, width: t, height: t, patternUnits: "userSpaceOnUse", patternTransform: `rotate(${C}) translate(${f},${f})`, children: [
      /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: t, height: t, fill: "none" }),
      /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: t / 2, height: t / 2, fill: v(o, -40), opacity: s * 0.7 }),
      /* @__PURE__ */ e.jsx("rect", { x: t / 2, y: t / 2, width: t / 2, height: t / 2, fill: v(o, -40), opacity: s * 0.7 }),
      /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: t / 2, height: t / 2, fill: v(o, -60), opacity: s * 0.3 }),
      /* @__PURE__ */ e.jsx("rect", { x: t / 2, y: t / 2, width: t / 2, height: t / 2, fill: v(o, -60), opacity: s * 0.3 })
    ] }),
    /* @__PURE__ */ e.jsxs("pattern", { id: V, width: t, height: t, patternUnits: "userSpaceOnUse", patternTransform: `rotate(${C}) translate(${f},${f})`, children: [
      /* @__PURE__ */ e.jsx("circle", { cx: t / 2, cy: t / 2, r: t / 6, fill: v(o, -50), opacity: s * 0.8 }),
      /* @__PURE__ */ e.jsx("circle", { cx: t / 4, cy: t / 4, r: t / 12, fill: v(o, -70), opacity: s * 0.6 }),
      /* @__PURE__ */ e.jsx("circle", { cx: t * 3 / 4, cy: t * 3 / 4, r: t / 12, fill: v(o, -70), opacity: s * 0.6 })
    ] }),
    /* @__PURE__ */ e.jsxs("pattern", { id: T, width: t * 1.5, height: t * 1.5, patternUnits: "userSpaceOnUse", patternTransform: `rotate(${C}) translate(${f},${f})`, children: [
      /* @__PURE__ */ e.jsx("path", { d: `M0,${t * 1.5} L${t * 1.5},0 M-${t / 4},${t * 1.25} L${t / 4},${t / 4} M${t * 1.25},${t * 1.75} L${t * 1.75},${t * 1.25}`, stroke: v(o, -60), strokeWidth: "2", opacity: s * 0.8 }),
      /* @__PURE__ */ e.jsx("path", { d: `M${t / 2},${t * 1.5} L${t * 1.5},${t / 2} M${t / 4},${t * 1.25} L${t * 3 / 4},${t / 4} M${t * 1.25},${t * 1.75} L${t * 1.75},${t * 1.25}`, stroke: v(o, -80), strokeWidth: "1", opacity: s * 0.5 })
    ] }),
    /* @__PURE__ */ e.jsxs("pattern", { id: q, width: t, height: t, patternUnits: "userSpaceOnUse", patternTransform: `rotate(${C}) translate(${f},${f})`, children: [
      /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: t / 2, height: t, fill: v(o, -50), opacity: s * 0.8 }),
      /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: t / 4, height: t, fill: v(o, -70), opacity: s * 0.4 }),
      /* @__PURE__ */ e.jsx("rect", { x: t / 2, y: "0", width: t / 4, height: t, fill: v(o, -30), opacity: s * 0.3 })
    ] }),
    /* @__PURE__ */ e.jsxs("pattern", { id: L, width: t * 1.5, height: t * 0.75, patternUnits: "userSpaceOnUse", patternTransform: `rotate(${C}) translate(${f},${f})`, children: [
      /* @__PURE__ */ e.jsx("path", { d: `M0,${t * 0.375} Q${t * 0.375},0 ${t * 0.75},${t * 0.375} T${t * 1.5},${t * 0.375}`, stroke: v(o, -50), strokeWidth: "2", fill: "none", opacity: s * 0.8 }),
      /* @__PURE__ */ e.jsx("path", { d: `M0,${t * 0.375} Q${t * 0.375},${t * 0.75} ${t * 0.75},${t * 0.375} T${t * 1.5},${t * 0.375}`, stroke: v(o, -70), strokeWidth: "1", fill: "none", opacity: s * 0.4 })
    ] }),
    /* @__PURE__ */ e.jsxs("pattern", { id: S, width: t * 0.75, height: t * 0.75, patternUnits: "userSpaceOnUse", patternTransform: `rotate(${C}) translate(${f},${f})`, children: [
      /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: t * 0.75, height: t * 0.75, fill: "none" }),
      /* @__PURE__ */ e.jsx("circle", { cx: t * 0.125, cy: t * 0.125, r: t * 0.1, fill: v(o, -60), opacity: s * 0.8 }),
      /* @__PURE__ */ e.jsx("rect", { x: t * 0.375, y: t * 0.375, width: t * 0.125, height: t * 0.25, fill: v(o, -60), opacity: s * 0.8 }),
      /* @__PURE__ */ e.jsx("circle", { cx: t * 0.625, cy: t * 0.625, r: t * 0.08, fill: v(o, -80), opacity: s * 0.6 }),
      /* @__PURE__ */ e.jsx("rect", { x: t * 0.125, y: t * 0.5, width: t * 0.1, height: t * 0.15, fill: v(o, -80), opacity: s * 0.6 })
    ] }),
    /* @__PURE__ */ e.jsxs("pattern", { id: A, width: t * 1.25, height: t * 1.25, patternUnits: "userSpaceOnUse", patternTransform: `rotate(${C}) translate(${f},${f})`, children: [
      /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: t * 0.625, height: t * 0.625, fill: v(o, -50), opacity: s * 0.8 }),
      /* @__PURE__ */ e.jsx("rect", { x: t * 0.625, y: t * 0.625, width: t * 0.625, height: t * 0.625, fill: v(o, -50), opacity: s * 0.8 }),
      /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: t * 0.625, height: t * 0.625, fill: v(o, -70), opacity: s * 0.4 }),
      /* @__PURE__ */ e.jsx("rect", { x: t * 0.625, y: t * 0.625, width: t * 0.625, height: t * 0.625, fill: v(o, -70), opacity: s * 0.4 })
    ] }),
    Y()
  ] }), H = () => /* @__PURE__ */ e.jsxs("g", { children: [
    /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: "100", height: "4", fill: "url(#topShadow)", opacity: "0.32" }),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: se(),
        fill: "rgba(0,0,0,0.22)",
        opacity: "0.45",
        transform: "translate(2, 2)"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(0),
        fill: "url(#pleatGrad)",
        opacity: "0.7"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(0),
        fill: "url(#curtainGrad)",
        opacity: "0.7"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(0),
        fill: o,
        opacity: "0.4"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(1),
        fill: "url(#depthGrad)",
        opacity: "0.3"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(2),
        fill: "url(#depthGrad)",
        opacity: "0.2"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(0),
        fill: "url(#highlightGrad)",
        opacity: "0.2"
      }
    ),
    /* @__PURE__ */ e.jsx("rect", { width: "100", height: "100", fill: "url(#sheerTexture)", opacity: "0.4" }),
    /* @__PURE__ */ e.jsx("rect", { width: "100", height: "100", filter: "url(#noise)", opacity: "0.2" }),
    g === "linen" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${_})`, opacity: s * 2 }),
    g === "suede" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${P})`, opacity: s * 1.8 }),
      /* @__PURE__ */ e.jsx("path", { d: a(0), filter: "url(#suedeNoise)", fill: "#fff", opacity: "0.15" })
    ] }),
    g === "velvet" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx("path", { d: a(0), fill: "url(#velvetGrad)", opacity: "0.35" }),
      /* @__PURE__ */ e.jsx("path", { d: a(0), filter: "url(#noise)", fill: "#fff", opacity: "0.15" })
    ] }),
    g === "square" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${N})`, opacity: s * 1.8 }),
    g === "dot" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${V})`, opacity: s * 1.7 }),
    g === "herringbone" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${T})`, opacity: s * 2 }),
    g === "stripe" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${q})`, opacity: s * 1.8 }),
    g === "wave" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${L})`, opacity: s * 1.7 }),
    g === "tweed" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${S})`, opacity: s * 2 }),
    g === "check" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${A})`, opacity: s * 1.8 })
  ] }), ee = () => /* @__PURE__ */ e.jsxs("g", { children: [
    /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: "100", height: "4", fill: "url(#topShadow)", opacity: "0.38" }),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: se(),
        fill: "rgba(0,0,0,0.28)",
        opacity: "0.55",
        transform: "translate(3, 3)",
        filter: "url(#depthShadow)"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(0),
        fill: "url(#pleatGrad)",
        opacity: "1"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(0),
        fill: "url(#curtainGrad)",
        opacity: "0.7"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(1),
        fill: "url(#depthGrad)",
        opacity: "0.4"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(2),
        fill: "url(#depthGrad)",
        opacity: "0.3"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(3),
        fill: "url(#depthGrad)",
        opacity: "0.2"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(0),
        fill: "url(#highlightGrad)",
        opacity: "0.25"
      }
    ),
    g === "linen" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${_})`, opacity: s * 1.5 }),
    g === "suede" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${P})`, opacity: s * 1.2 }),
      /* @__PURE__ */ e.jsx("path", { d: a(0), filter: "url(#suedeNoise)", fill: "#fff", opacity: "0.12" })
    ] }),
    g === "velvet" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx("path", { d: a(0), fill: "url(#velvetGrad)", opacity: "0.25" }),
      /* @__PURE__ */ e.jsx("path", { d: a(0), filter: "url(#noise)", fill: "#fff", opacity: "0.12" })
    ] }),
    g === "square" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${N})`, opacity: s * 1.3 }),
    g === "dot" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${V})`, opacity: s * 1.2 }),
    g === "herringbone" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${T})`, opacity: s * 1.4 }),
    g === "stripe" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${q})`, opacity: s * 1.3 }),
    g === "wave" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${L})`, opacity: s * 1.2 }),
    g === "tweed" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${S})`, opacity: s * 1.4 }),
    g === "check" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${A})`, opacity: s * 1.3 })
  ] }), re = () => /* @__PURE__ */ e.jsxs("g", { children: [
    /* @__PURE__ */ e.jsx("rect", { x: "0", y: "0", width: "100", height: "4", fill: "url(#topShadow)", opacity: "1" }),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(0),
        fill: o,
        opacity: "1"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: se(),
        fill: "rgba(0,0,0,0.8)",
        opacity: "0.9",
        transform: "translate(4, 4)",
        filter: "url(#depthShadow)"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(0),
        fill: "url(#pleatGrad)",
        opacity: "0.8"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(0),
        fill: "url(#curtainGrad)",
        opacity: "0.6"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(1),
        fill: o,
        opacity: "0.4"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(2),
        fill: o,
        opacity: "0.2"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "path",
      {
        d: a(0),
        fill: "url(#highlightGrad)",
        opacity: "0.3"
      }
    ),
    g === "linen" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${_})`, opacity: s * 1.5 }),
    g === "suede" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${P})`, opacity: s * 1.2 }),
      /* @__PURE__ */ e.jsx("path", { d: a(0), filter: "url(#suedeNoise)", fill: "#fff", opacity: "0.12" })
    ] }),
    g === "velvet" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx("path", { d: a(0), fill: "url(#velvetGrad)", opacity: "0.25" }),
      /* @__PURE__ */ e.jsx("path", { d: a(0), filter: "url(#noise)", fill: "#fff", opacity: "0.12" })
    ] }),
    g === "square" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${N})`, opacity: s * 1.3 }),
    g === "dot" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${V})`, opacity: s * 1.2 }),
    g === "herringbone" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${T})`, opacity: s * 1.4 }),
    g === "stripe" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${q})`, opacity: s * 1.3 }),
    g === "wave" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${L})`, opacity: s * 1.2 }),
    g === "tweed" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${S})`, opacity: s * 1.4 }),
    g === "check" && /* @__PURE__ */ e.jsx("path", { d: a(0), fill: `url(#${A})`, opacity: s * 1.3 })
  ] }), I = () => ({
    transform: `perspective(1000px) rotateX(${$}deg)`,
    transformStyle: "preserve-3d",
    transition: "clip-path 0.5s cubic-bezier(.4,2,.6,1), transform 0.3s ease"
  });
  return D === "편개" ? /* @__PURE__ */ e.jsx(
    "div",
    {
      style: {
        width: `${m}%`,
        height: `${c}%`,
        position: "absolute",
        top: 0,
        left: 0,
        opacity: l,
        clipPath: K(),
        ...I(),
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ e.jsxs(
        "svg",
        {
          width: "100%",
          height: "100%",
          viewBox: "0 0 100 100",
          preserveAspectRatio: "none",
          style: { display: "block" },
          children: [
            Q,
            R === "sheer" ? H() : R === "blackout" ? re() : ee()
          ]
        }
      )
    }
  ) : (() => {
    const i = 50 - 35 * (u / 100), b = 50 - 35 * (u / 100), w = 100 - b;
    return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(
        "div",
        {
          style: {
            width: `${i}%`,
            height: `${c}%`,
            position: "absolute",
            top: 0,
            left: 0,
            opacity: l,
            overflow: "hidden",
            ...I(),
            pointerEvents: "none"
          },
          children: /* @__PURE__ */ e.jsxs(
            "svg",
            {
              width: "200%",
              height: "100%",
              viewBox: "0 0 100 100",
              preserveAspectRatio: "none",
              style: { display: "block", position: "absolute", left: 0, top: 0 },
              children: [
                Q,
                R === "sheer" ? H() : R === "blackout" ? re() : ee()
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ e.jsx(
        "div",
        {
          style: {
            width: `${b}%`,
            height: `${c}%`,
            position: "absolute",
            top: 0,
            left: `${w}%`,
            opacity: l,
            overflow: "hidden",
            ...I(),
            pointerEvents: "none"
          },
          children: /* @__PURE__ */ e.jsxs(
            "svg",
            {
              width: "200%",
              height: "100%",
              viewBox: "0 0 100 100",
              preserveAspectRatio: "none",
              style: { display: "block", position: "absolute", left: "-100%", top: 0 },
              children: [
                Q,
                R === "sheer" ? H() : R === "blackout" ? re() : ee()
              ]
            }
          )
        }
      )
    ] });
  })();
}, v = (d, u) => {
  const n = parseInt(d.replace("#", ""), 16), m = Math.round(2.55 * u), c = (n >> 16) + m, x = (n >> 8 & 255) + m, j = (n & 255) + m;
  return "#" + (16777216 + (c < 255 ? c < 1 ? 0 : c : 255) * 65536 + (x < 255 ? x < 1 ? 0 : x : 255) * 256 + (j < 255 ? j < 1 ? 0 : j : 255)).toString(16).slice(1);
}, ze = ({
  backgroundImage: d,
  curtainType: u,
  blindSubType: n,
  pleatType: m,
  curtainOpen: c,
  selectedColor: x = "#FFFFFF",
  opacity: j = 1,
  windowRect: l,
  width: R = 100,
  height: D = 100,
  fabricType: $ = "plain",
  openingStyle: G = "양개",
  waveDepth: g = 18,
  waveCount: t = 10,
  perspectiveAngle: s = 5,
  depthIntensity: C = 1,
  indoorLight: f,
  sunLight: W,
  materialType: E = "plain",
  patternScale: z = 8,
  patternOpacity: p = 0.45,
  patternAngle: o = 0,
  patternOffset: _ = 0,
  colorLightness: P = 0,
  colorSaturation: N = 0,
  colorHue: V = 0,
  pleatContrast: T = 1
}) => {
  const q = f !== void 0 ? 0.5 + f / 100 : 1, L = W !== void 0 ? 0.45 * (W / 100) : 0, A = j !== 1 ? j : $ === "blackout" ? 1 : 0.95;
  return /* @__PURE__ */ e.jsxs("div", { style: {
    position: "relative",
    width: "100%",
    maxWidth: "768px",
    aspectRatio: "16/9",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    margin: "0 auto",
    filter: `brightness(${q})`
  }, children: [
    /* @__PURE__ */ e.jsx(
      "img",
      {
        src: d,
        alt: "업로드된 배경",
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }
      }
    ),
    L > 0 && /* @__PURE__ */ e.jsx(
      "div",
      {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(255,255,220,0.7) 0%, rgba(255,255,255,0.3) 100%)",
          opacity: L,
          zIndex: 1
        }
      }
    ),
    /* @__PURE__ */ e.jsx("div", { style: {
      position: "absolute",
      top: l ? `${l.y}%` : 0,
      left: l ? `${l.x}%` : 0,
      width: l ? `${l.width}%` : "100%",
      height: l ? `${l.height}%` : "100%",
      pointerEvents: "none",
      opacity: A,
      zIndex: 2
    }, children: u === "블라인드" && n ? /* @__PURE__ */ e.jsx(
      Me,
      {
        blindType: n,
        color: x,
        width: R,
        height: D,
        state: c >= 66 ? "open" : c >= 33 ? "half" : "closed"
      }
    ) : /* @__PURE__ */ e.jsx(
      Pe,
      {
        pleatType: m,
        curtainOpen: c,
        color: x,
        width: R,
        height: D,
        fabricType: $,
        openingStyle: G,
        waveDepth: g,
        waveCount: t,
        opacity: A,
        perspectiveAngle: s,
        depthIntensity: C,
        materialType: E,
        patternScale: z,
        patternOpacity: p,
        patternAngle: o,
        patternOffset: _,
        colorLightness: P,
        colorSaturation: N,
        colorHue: V,
        pleatContrast: T
      }
    ) })
  ] });
}, Ie = ({
  photo: d,
  windowArea: u,
  selectedProducts: n,
  curtainOpen: m,
  selectedColor: c,
  curtainWidth: x = 100,
  curtainHeight: j = 100,
  openingStyle: l = "양개",
  waveDepth: R = 18,
  waveCount: D = 10,
  curtainOpacity: $ = 0.85,
  perspectiveAngle: G = 5,
  depthIntensity: g = 1,
  indoorLight: t,
  sunLight: s,
  materialType: C = "plain",
  patternScale: f = 8,
  patternOpacity: W = 0.45,
  patternAngle: E = 0,
  patternOffset: z = 0,
  colorLightness: p = 0,
  colorSaturation: o = 0,
  colorHue: _ = 0,
  pleatContrast: P = 1
}) => {
  const N = () => n.length === 0 ? "민자" : n[0].pleat, V = () => n.length === 0 ? "겉커튼" : n[0].type, T = () => {
    if (n.length !== 0)
      return n[0].subType;
  }, q = () => c?.hex || "#FFFFFF", L = () => {
    if (n.length === 0) return "plain";
    const K = n[0];
    return K.type === "속커튼" ? "sheer" : K.type === "겉커튼" ? "blackout" : "plain";
  }, A = $ !== 0.85 ? $ : (() => {
    if (n.length === 0) return 0.95;
    const K = n[0];
    return K.type === "겉커튼" ? 1 : (K.type === "속커튼", 0.95);
  })();
  return /* @__PURE__ */ e.jsx("div", { style: {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: "400px"
  }, children: /* @__PURE__ */ e.jsx(
    ze,
    {
      backgroundImage: d,
      curtainType: V(),
      blindSubType: T(),
      pleatType: N(),
      curtainOpen: m,
      selectedColor: q(),
      windowRect: u,
      width: x,
      height: j,
      fabricType: L(),
      openingStyle: l,
      waveDepth: R,
      waveCount: D,
      opacity: A,
      perspectiveAngle: G,
      depthIntensity: g,
      indoorLight: t,
      sunLight: s,
      materialType: C,
      patternScale: f,
      patternOpacity: W,
      patternAngle: E,
      patternOffset: z,
      colorLightness: p,
      colorSaturation: o,
      colorHue: _,
      pleatContrast: P
    }
  ) });
}, We = ({ containerId: d }) => {
  const u = ge(null), n = async () => {
    const m = document.getElementById(d);
    if (!m) return alert("캡처할 영역을 찾을 수 없습니다.");
    const c = (await import("./html2canvas.esm-B5Zl-F6w.js")).default;
    (await c(m, { useCORS: !0 })).toBlob((j) => {
      if (!j) return alert("이미지 변환에 실패했습니다.");
      const l = URL.createObjectURL(j);
      u.current && (u.current.href = l, u.current.download = "curtain_simulation.jpg", u.current.click(), URL.revokeObjectURL(l));
    }, "image/jpeg", 0.95);
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      "button",
      {
        onClick: n,
        style: {
          padding: "0.5rem 1rem",
          backgroundColor: "#059669",
          color: "white",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          fontSize: "0.875rem",
          fontWeight: "500",
          boxShadow: "0 2px 8px rgba(80,60,30,0.08)",
          transition: "background 0.2s"
        },
        onMouseEnter: (m) => {
          m.currentTarget.style.backgroundColor = "#047857";
        },
        onMouseLeave: (m) => {
          m.currentTarget.style.backgroundColor = "#059669";
        },
        children: "📸 JPG 저장하기"
      }
    ),
    /* @__PURE__ */ e.jsx("a", { ref: u, style: { display: "none" } })
  ] });
}, Te = [
  {
    name: "속커튼",
    type: "속커튼",
    pleat: "민자",
    isBlackout: !1,
    imageBasePath: "/samples/curtain1",
    availableColors: [
      "white",
      "black",
      "gray",
      "pastel_blue",
      "pastel_pink",
      "pastel_green",
      "warm_beige",
      "warm_cream",
      "warm_ivory",
      "neutral_lightgray",
      "neutral_silver"
    ]
  },
  {
    name: "겉커튼",
    type: "겉커튼",
    pleat: "나비",
    isBlackout: !0,
    imageBasePath: "/samples/curtain2",
    availableColors: [
      "black",
      "dark_charcoal",
      "dark_navy",
      "dark_burgundy",
      "dark_brown",
      "cool_navy",
      "cool_darkgray",
      "cool_charcoal",
      "neutral_taupe"
    ]
  },
  // 블라인드
  {
    name: "알루미늄 블라인드",
    type: "블라인드",
    subType: "알루미늄블라인드",
    pleat: "민자",
    isBlackout: !1,
    imageBasePath: "/samples/알루미늄블라인드",
    availableColors: [
      "white",
      "black",
      "gray",
      "silver",
      "pastel_silver",
      "neutral_lightgray",
      "cool_steel",
      "cool_slate",
      "bright_blue",
      "bright_green",
      "bright_red"
    ]
  },
  {
    name: "우드 블라인드",
    type: "블라인드",
    subType: "우드블라인드",
    pleat: "민자",
    isBlackout: !1,
    imageBasePath: "/samples/우드블라인드",
    availableColors: [
      "warm_brown",
      "warm_bronze",
      "warm_copper",
      "warm_gold",
      "warm_amber",
      "warm_terracotta",
      "warm_rust",
      "warm_sand",
      "warm_tan",
      "neutral_taupe"
    ]
  },
  {
    name: "콤비 블라인드",
    type: "블라인드",
    subType: "콤비블라인드",
    pleat: "민자",
    isBlackout: !1,
    imageBasePath: "/samples/콤비블라인드",
    availableColors: [
      "white",
      "black",
      "gray",
      "pastel_blue",
      "pastel_green",
      "pastel_pink",
      "warm_beige",
      "warm_cream",
      "cool_navy",
      "cool_teal",
      "neutral_lightgray"
    ]
  },
  {
    name: "롤 블라인드",
    type: "블라인드",
    subType: "롤블라인드",
    pleat: "민자",
    isBlackout: !1,
    imageBasePath: "/samples/롤블라인드",
    availableColors: [
      "white",
      "black",
      "gray",
      "pastel_blue",
      "pastel_green",
      "pastel_pink",
      "warm_beige",
      "warm_cream",
      "cool_navy",
      "cool_teal",
      "neutral_lightgray"
    ]
  },
  {
    name: "암막 롤 블라인드",
    type: "블라인드",
    subType: "암막롤블라인드",
    pleat: "민자",
    isBlackout: !0,
    imageBasePath: "/samples/암막롤블라인드",
    availableColors: [
      "black",
      "dark_charcoal",
      "dark_navy",
      "dark_burgundy",
      "dark_brown",
      "cool_navy",
      "cool_darkgray",
      "cool_charcoal",
      "neutral_taupe"
    ]
  },
  {
    name: "3D 쉐이드",
    type: "블라인드",
    subType: "3d쉐이드",
    pleat: "민자",
    isBlackout: !1,
    imageBasePath: "/samples/3d쉐이드",
    availableColors: [
      "white",
      "pastel_blue",
      "pastel_green",
      "pastel_pink",
      "pastel_lavender",
      "warm_beige",
      "warm_cream",
      "cool_navy",
      "cool_teal",
      "neutral_lightgray"
    ]
  },
  {
    name: "루미넷 쉐이드",
    type: "블라인드",
    subType: "루미넷쉐이드",
    pleat: "민자",
    isBlackout: !1,
    imageBasePath: "/samples/루미넷쉐이드",
    availableColors: [
      "white",
      "pastel_blue",
      "pastel_green",
      "pastel_pink",
      "pastel_lavender",
      "warm_beige",
      "warm_cream",
      "cool_navy",
      "cool_teal",
      "neutral_lightgray"
    ]
  },
  {
    name: "허니콤 쉐이드",
    type: "블라인드",
    subType: "허니콤쉐이드",
    pleat: "민자",
    isBlackout: !1,
    imageBasePath: "/samples/허니콤쉐이드",
    availableColors: [
      "white",
      "pastel_blue",
      "pastel_green",
      "pastel_pink",
      "pastel_lavender",
      "warm_beige",
      "warm_cream",
      "cool_navy",
      "cool_teal",
      "neutral_lightgray"
    ]
  },
  {
    name: "베네시안 블라인드",
    type: "블라인드",
    subType: "베네시안블라인드",
    pleat: "민자",
    isBlackout: !1,
    imageBasePath: "/samples/베네시안블라인드",
    availableColors: [
      "white",
      "black",
      "gray",
      "warm_brown",
      "warm_bronze",
      "warm_copper",
      "cool_navy",
      "cool_steel",
      "neutral_lightgray",
      "neutral_silver"
    ]
  }
], Ne = () => {
  const [d, u] = k(null), [n, m] = k({
    x: 25,
    y: 20,
    width: 30,
    height: 40
  }), [c, x] = k(50), [j, l] = k([]), [R, D] = k(null), [$, G] = k(50), [g, t] = k(50), [s, C] = k(100), [f, W] = k(100), [E, z] = k("양개"), [p, o] = k(5), [_, P] = k(48), [N, V] = k(0.95), [T, q] = k(0), [L, S] = k(0.5), [A, K] = k("plain"), [a, se] = k(8), [O, ae] = k(0.45), [r, y] = k(0), [B, Y] = k(0), [Q, H] = k(0), [ee, re] = k(0), [I, ie] = k(0), [oe, h] = k(1), M = (i) => {
    m(i);
  };
  return /* @__PURE__ */ e.jsxs("div", { style: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    gap: "2rem",
    padding: 0
  }, children: [
    /* @__PURE__ */ e.jsx("div", { style: {
      position: "fixed",
      top: 0,
      left: "50%",
      transform: "translateX(calc(-50% - 38px))",
      width: "900px",
      maxWidth: "100vw",
      zIndex: 100,
      background: "var(--color-background)",
      boxShadow: "0 4px 16px rgba(80,60,30,0.06)",
      borderRadius: "0 0 20px 20px"
    }, children: /* @__PURE__ */ e.jsx("div", { style: {
      margin: "0 auto",
      maxWidth: "900px",
      width: "100%",
      background: "var(--color-background)",
      borderRadius: "20px 20px 12px 12px"
    }, children: d ? /* @__PURE__ */ e.jsx("div", { style: {
      width: "100%",
      maxWidth: "900px",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem"
    }, children: /* @__PURE__ */ e.jsxs("div", { className: "curtain-preview-frame", style: {
      width: "100%",
      height: "500px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(80,60,30,0.12)",
      background: "white",
      position: "relative"
    }, children: [
      /* @__PURE__ */ e.jsx("div", { style: { flex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }, children: /* @__PURE__ */ e.jsx(
        Ie,
        {
          photo: d,
          windowArea: n,
          selectedProducts: j,
          curtainOpen: c,
          selectedColor: R,
          curtainWidth: s,
          curtainHeight: f,
          openingStyle: E,
          waveDepth: p,
          waveCount: 2 * (_ - 1),
          curtainOpacity: N,
          perspectiveAngle: T,
          depthIntensity: L,
          indoorLight: $,
          sunLight: g,
          materialType: A,
          patternScale: a,
          patternOpacity: O,
          patternAngle: r,
          patternOffset: B,
          colorLightness: Q,
          colorSaturation: ee,
          colorHue: I,
          pleatContrast: oe
        }
      ) }) }),
      /* @__PURE__ */ e.jsxs("div", { style: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.2rem",
        padding: "1rem 1.5rem 1.2rem 1.5rem",
        borderTop: "1px solid #eee",
        background: "white"
      }, children: [
        /* @__PURE__ */ e.jsx("div", { style: { display: "flex", flexDirection: "row", gap: "0.5rem" }, children: ["겉커튼", "속커튼"].map((i) => /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: () => {
              const b = Te.find((w) => w.type === i);
              b && (l([b]), D(null));
            },
            style: {
              padding: "0.6rem 1.2rem",
              border: j[0]?.type === i ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
              borderRadius: "8px",
              background: j[0]?.type === i ? "var(--color-primary)" : "white",
              color: j[0]?.type === i ? "white" : "var(--color-text)",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: "500"
            },
            children: i
          },
          i
        )) }),
        /* @__PURE__ */ e.jsx(je, { onUpload: u }),
        /* @__PURE__ */ e.jsx(We, { containerId: "simulator-root" }),
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", minWidth: 120 }, children: [
          /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "600", marginBottom: "0.5rem", fontSize: "1rem", textAlign: "center" }, children: [
            "🪟 커튼 개방: ",
            c,
            "%"
          ] }),
          /* @__PURE__ */ e.jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 100,
              value: c,
              onChange: (i) => x(Number(i.target.value)),
              style: { width: "120px" }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "row", gap: "0.5rem" }, children: [
          /* @__PURE__ */ e.jsx(
            "button",
            {
              onClick: () => z("양개"),
              style: {
                padding: "0.6rem 1.1rem",
                border: E === "양개" ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                borderRadius: "8px",
                background: E === "양개" ? "var(--color-primary)" : "white",
                color: E === "양개" ? "white" : "var(--color-text)",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "500"
              },
              children: "양개"
            }
          ),
          /* @__PURE__ */ e.jsx(
            "button",
            {
              onClick: () => z("편개"),
              style: {
                padding: "0.6rem 1.1rem",
                border: E === "편개" ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                borderRadius: "8px",
                background: E === "편개" ? "var(--color-primary)" : "white",
                color: E === "편개" ? "white" : "var(--color-text)",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "500"
              },
              children: "편개"
            }
          )
        ] })
      ] })
    ] }) }) : /* @__PURE__ */ e.jsxs("div", { style: {
      width: "100%",
      maxWidth: "900px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1.5rem"
    }, children: [
      /* @__PURE__ */ e.jsx("div", { className: "curtain-preview-frame", style: {
        width: "100%",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-muted)",
        fontSize: "1.3rem",
        borderRadius: "16px",
        border: "2px dashed var(--color-border)",
        background: "var(--color-background)"
      }, children: "📸 사진을 업로드하면 커튼 시뮬레이션을 시작할 수 있습니다" }),
      /* @__PURE__ */ e.jsx("div", { style: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      }, children: /* @__PURE__ */ e.jsx(je, { onUpload: u }) })
    ] }) }) }),
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
          padding: "500px 2rem 2rem",
          background: "transparent"
        },
        children: [
          /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "1.5rem" }, children: [
            d && /* @__PURE__ */ e.jsxs("div", { className: "card", style: { padding: "1.5rem" }, children: [
              /* @__PURE__ */ e.jsx("h3", { style: { margin: "0 0 1rem 0", fontSize: "1.1rem", fontWeight: "600" }, children: "🪟 창 위치 선택" }),
              /* @__PURE__ */ e.jsx(Ee, { photo: d, onWindowSelect: M, hideTitle: !0 })
            ] }),
            d && /* @__PURE__ */ e.jsxs("div", { className: "card", style: { padding: "1.5rem" }, children: [
              /* @__PURE__ */ e.jsx("h3", { style: { margin: "0 0 1rem 0", fontSize: "1.1rem", fontWeight: "600" }, children: "⚙️ 기본 설정" }),
              /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: "1rem" }, children: [
                /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                  "조명: ",
                  $,
                  "%"
                ] }),
                /* @__PURE__ */ e.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 100,
                    value: $,
                    onChange: (i) => G(Number(i.target.value)),
                    style: { width: "100%" }
                  }
                )
              ] }),
              /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: "1rem" }, children: [
                /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                  "채광: ",
                  g,
                  "%"
                ] }),
                /* @__PURE__ */ e.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 100,
                    value: g,
                    onChange: (i) => t(Number(i.target.value)),
                    style: { width: "100%" }
                  }
                )
              ] }),
              /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: "1rem" }, children: [
                /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                  "커튼 높이: ",
                  f,
                  "%"
                ] }),
                /* @__PURE__ */ e.jsx(
                  "input",
                  {
                    type: "range",
                    min: 40,
                    max: 120,
                    value: f,
                    onChange: (i) => W(Number(i.target.value)),
                    style: { width: "100%" }
                  }
                )
              ] })
            ] }),
            d && /* @__PURE__ */ e.jsxs("div", { className: "card", style: { padding: "1.5rem" }, children: [
              /* @__PURE__ */ e.jsx("h3", { style: { margin: "0 0 1rem 0", fontSize: "1.1rem", fontWeight: "600" }, children: "🎨 색상 조정" }),
              /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "1rem" }, children: [
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                    "명도: ",
                    Q
                  ] }),
                  /* @__PURE__ */ e.jsx(
                    "input",
                    {
                      type: "range",
                      min: -40,
                      max: 40,
                      value: Q,
                      onChange: (i) => H(Number(i.target.value)),
                      style: { width: "100%" }
                    }
                  )
                ] }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                    "채도: ",
                    ee
                  ] }),
                  /* @__PURE__ */ e.jsx(
                    "input",
                    {
                      type: "range",
                      min: -50,
                      max: 50,
                      value: ee,
                      onChange: (i) => re(Number(i.target.value)),
                      style: { width: "100%" }
                    }
                  )
                ] }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                    "색상: ",
                    I
                  ] }),
                  /* @__PURE__ */ e.jsx(
                    "input",
                    {
                      type: "range",
                      min: -30,
                      max: 30,
                      value: I,
                      onChange: (i) => ie(Number(i.target.value)),
                      style: { width: "100%" }
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "1.5rem" }, children: [
            d && /* @__PURE__ */ e.jsxs("div", { className: "card", style: { padding: "1.5rem" }, children: [
              /* @__PURE__ */ e.jsx("h3", { style: { margin: "0 0 1rem 0", fontSize: "1.1rem", fontWeight: "600" }, children: "🌈 색상 선택" }),
              /* @__PURE__ */ e.jsx(De, { selectedColor: R, onColorSelect: D, hideLabel: !0 })
            ] }),
            d && /* @__PURE__ */ e.jsxs("div", { className: "card", style: { padding: "1.5rem" }, children: [
              /* @__PURE__ */ e.jsx("h3", { style: { margin: "0 0 1rem 0", fontSize: "1.1rem", fontWeight: "600" }, children: "🎛️ 고급 설정" }),
              /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "1rem" }, children: [
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                    "주름 개수: ",
                    _,
                    "개"
                  ] }),
                  /* @__PURE__ */ e.jsx(
                    "input",
                    {
                      type: "range",
                      min: 12,
                      max: 96,
                      step: 6,
                      value: _,
                      onChange: (i) => P(Number(i.target.value)),
                      style: { width: "100%" }
                    }
                  )
                ] }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                    "투명도: ",
                    Math.round(N * 100),
                    "%"
                  ] }),
                  /* @__PURE__ */ e.jsx(
                    "input",
                    {
                      type: "range",
                      min: 0.3,
                      max: 1,
                      step: 0.05,
                      value: N,
                      onChange: (i) => V(Number(i.target.value)),
                      style: { width: "100%" }
                    }
                  )
                ] }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                    "주름 명암: ",
                    oe
                  ] }),
                  /* @__PURE__ */ e.jsx(
                    "input",
                    {
                      type: "range",
                      min: 0.3,
                      max: 2,
                      step: 0.05,
                      value: oe,
                      onChange: (i) => h(Number(i.target.value)),
                      style: { width: "100%" }
                    }
                  )
                ] }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                    "웨이브 깊이: ",
                    p
                  ] }),
                  /* @__PURE__ */ e.jsx(
                    "input",
                    {
                      type: "range",
                      min: 1,
                      max: 10,
                      value: p,
                      onChange: (i) => o(Number(i.target.value)),
                      style: { width: "100%" }
                    }
                  )
                ] }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                    "3D 각도: ",
                    T,
                    "°"
                  ] }),
                  /* @__PURE__ */ e.jsx(
                    "input",
                    {
                      type: "range",
                      min: -10,
                      max: 10,
                      value: T,
                      onChange: (i) => q(Number(i.target.value)),
                      style: { width: "100%" }
                    }
                  )
                ] }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                    "깊이 강도: ",
                    L
                  ] }),
                  /* @__PURE__ */ e.jsx(
                    "input",
                    {
                      type: "range",
                      min: 0.1,
                      max: 1,
                      step: 0.1,
                      value: L,
                      onChange: (i) => S(Number(i.target.value)),
                      style: { width: "100%" }
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "1.5rem" }, children: [
            d && /* @__PURE__ */ e.jsxs("div", { className: "card", style: { padding: "1.5rem" }, children: [
              /* @__PURE__ */ e.jsx("h3", { style: { margin: "0 0 1rem 0", fontSize: "1.1rem", fontWeight: "600" }, children: "🎨 재질 선택" }),
              /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.6rem" }, children: [
                { value: "plain", label: "기본", icon: "⬜" },
                { value: "linen", label: "린넨", icon: "🧵" },
                { value: "suede", label: "스웨이드", icon: "🟫" },
                { value: "velvet", label: "벨벳", icon: "🟪" },
                { value: "square", label: "사각", icon: "⬛" },
                { value: "dot", label: "도트", icon: "🔴" },
                { value: "herringbone", label: "헤링본", icon: "🔶" },
                { value: "stripe", label: "스트라이프", icon: "📏" },
                { value: "wave", label: "웨이브", icon: "🌊" },
                { value: "tweed", label: "트위드", icon: "🧶" },
                { value: "check", label: "체크", icon: "🏁" }
              ].map((i) => /* @__PURE__ */ e.jsxs(
                "button",
                {
                  onClick: () => K(i.value),
                  style: {
                    padding: "0.6rem 0.4rem",
                    border: A === i.value ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                    borderRadius: "8px",
                    background: A === i.value ? "var(--color-primary)" : "white",
                    color: A === i.value ? "white" : "var(--color-text)",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.3rem"
                  },
                  children: [
                    /* @__PURE__ */ e.jsx("span", { style: { fontSize: "1.1rem" }, children: i.icon }),
                    /* @__PURE__ */ e.jsx("span", { children: i.label })
                  ]
                },
                i.value
              )) })
            ] }),
            d && /* @__PURE__ */ e.jsxs("div", { className: "card", style: { padding: "1.5rem" }, children: [
              /* @__PURE__ */ e.jsx("h3", { style: { margin: "0 0 1rem 0", fontSize: "1.1rem", fontWeight: "600" }, children: "🔄 재질 조정" }),
              /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "1rem" }, children: [
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                    "패턴 크기: ",
                    a,
                    "px"
                  ] }),
                  /* @__PURE__ */ e.jsx(
                    "input",
                    {
                      type: "range",
                      min: 4,
                      max: 32,
                      value: a,
                      onChange: (i) => se(Number(i.target.value)),
                      style: { width: "100%" }
                    }
                  )
                ] }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                    "패턴 진하기: ",
                    O
                  ] }),
                  /* @__PURE__ */ e.jsx(
                    "input",
                    {
                      type: "range",
                      min: 0.1,
                      max: 1,
                      step: 0.05,
                      value: O,
                      onChange: (i) => ae(Number(i.target.value)),
                      style: { width: "100%" }
                    }
                  )
                ] }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                    "패턴 각도: ",
                    r,
                    "°"
                  ] }),
                  /* @__PURE__ */ e.jsx(
                    "input",
                    {
                      type: "range",
                      min: 0,
                      max: 360,
                      value: r,
                      onChange: (i) => y(Number(i.target.value)),
                      style: { width: "100%" }
                    }
                  )
                ] }),
                /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsxs("label", { style: { display: "block", fontWeight: "500", marginBottom: "0.5rem", fontSize: "0.95rem" }, children: [
                    "패턴 오프셋: ",
                    B,
                    "px"
                  ] }),
                  /* @__PURE__ */ e.jsx(
                    "input",
                    {
                      type: "range",
                      min: 0,
                      max: 32,
                      value: B,
                      onChange: (i) => Y(Number(i.target.value)),
                      style: { width: "100%" }
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
};
export {
  Ne as CurtainSimulator
};
