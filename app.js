(() => {
  const gallery = [
    ["001", "viaje", "Foto mía y de Jairos sacando papada."],
    ["025", "viaje", "Foto grupal de Sexto EEA frente a la bahía."],
    ["030", "viaje", "El regreso a San Cristóbal, ya de noche."],
    ["003", "luperon", "Entrada de la Casa Museo: “Primera Espada de la Restauración”."],
    ["005", "luperon", "Vestimenta de la época."],
    ["008", "luperon", "Réplica de la estatua ecuestre de Luperón."],
    ["015", "luperon", "La cocina de la casa."],
    ["012", "luperon", "Balcón del segundo nivel."],
    ["021", "luperon", "Sala “Apoteosis”, durante la explicación del guía."],
    ["094", "fortaleza", "Patio con cañón y vista a la bahía."],
    ["089", "fortaleza", "Cañón entre las almenas."],
    ["098", "fortaleza", "El grupo recorriendo la parte alta de la fortaleza."],
    ["109", "fortaleza", "Placa: “Aquí estuvo preso Juan Pablo Duarte en agosto de 1844”."],
    ["108", "fortaleza", "Panel sobre el arresto de Duarte el 27 de agosto de 1844."],
    ["120", "fortaleza", "Vitrina con vasijas de cerámica antiguas."],
    ["122", "fortaleza", "Exposición “Primicias de América en la República Dominicana”."],
    ["068", "fortaleza", "Un momento relajado junto a los muros (yo, en el suelo)."],
    ["051", "parque", "El parque, con la fortaleza al fondo."],
    ["044", "parque", "Monumento a las víctimas del 6 de febrero de 1996."],
    ["056", "parque", "Brazos abiertos frente al Atlántico."],
    ["064", "parque", "Caminando por el sendero de piedra."]
  ];

  const grid = document.getElementById("grid");
  grid.innerHTML = gallery.map(([n, c, t]) =>
    `<figure data-c="${c}"><div class="ph" data-full="img/full/${n}.jpg" data-cap="${t}"><img src="img/thumb/${n}.jpg" alt="${t}" loading="lazy"></div><figcaption>${t}</figcaption></figure>`
  ).join("");

  document.querySelectorAll(".filters button").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach(x => x.classList.toggle("on", x === b));
    const f = b.dataset.f;
    grid.querySelectorAll("figure").forEach(fig => fig.classList.toggle("hide", f !== "all" && fig.dataset.c !== f));
  }));

  // Lightbox
  const lb = document.getElementById("lb"), lbImg = lb.querySelector("img"), lbCap = lb.querySelector("figcaption");
  let list = [], idx = 0;
  const show = i => {
    idx = (i + list.length) % list.length;
    const el = list[idx];
    lbImg.src = el.dataset.full;
    lbImg.alt = el.dataset.cap;
    lbCap.textContent = el.dataset.cap;
  };
  document.addEventListener("click", e => {
    const ph = e.target.closest(".ph");
    if (!ph) return;
    const scope = ph.closest("#grid") || document;
    list = [...scope.querySelectorAll(".ph")].filter(p => !p.closest("figure.hide"));
    show(list.indexOf(ph));
    lb.classList.add("on");
    document.body.style.overflow = "hidden";
  });
  const close = () => { lb.classList.remove("on"); document.body.style.overflow = ""; };
  lb.querySelector(".x").onclick = close;
  lb.querySelector(".p").onclick = () => show(idx - 1);
  lb.querySelector(".n").onclick = () => show(idx + 1);
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("on")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });

  // Timeline
  const events = [
    ["1563", "Comienza la construcción de la fortaleza", "Se inicia en la Puntilla de Puerto Plata para proteger el puerto de corsarios y piratas."],
    ["1577", "Se termina la Fortaleza San Felipe", "Concluye la obra, que se convierte en la principal defensa de la costa norte."],
    ["1605", "Orden de despoblar la ciudad", "El rey de España manda despoblar y demoler Puerto Plata para frenar el contrabando y la piratería; la fortaleza, sin embargo, queda en pie."],
    ["1739", "La fortaleza se restaura", "Con la llegada de colonos canarios a la zona, se rehabilita y se equipa militarmente."],
    ["1839", "Nace Gregorio Luperón", "Nace el 8 de septiembre en Puerto Plata, en una familia humilde."],
    ["1844", "Independencia y prisión de Duarte", "El 27 de febrero nace la República. En agosto, Santana declara traidores a Duarte y a otros trinitarios; Duarte es arrestado y encerrado en San Felipe antes de su destierro."],
    ["1861", "Anexión a España", "Pedro Santana proclama la reincorporación del país a España."],
    ["1863", "Comienza la Restauración", "El 16 de agosto, el Grito de Capotillo inicia la guerra. Luperón se convierte en uno de sus jefes principales."],
    ["1865", "Se recupera la independencia", "Las tropas españolas se retiran y termina la Anexión."],
    ["1879", "Luperón llega a la presidencia", "Encabeza un gobierno provisional desde Puerto Plata y luego es presidente hasta 1880."],
    ["1897", "Muere Luperón", "Fallece el 20 de mayo en su casa de Puerto Plata, la misma que hoy es museo."],
    ["1974", "La fortaleza se convierte en museo", "Tras su última restauración abre como museo. Ese año el Instituto Duartiano coloca la placa en memoria de Duarte."],
    ["1996", "Tragedia frente a la costa", "El 6 de febrero cae al mar un avión con destino a Alemania; mueren las 189 personas a bordo."],
    ["2005", "La casa de Luperón, patrimonio", "El decreto 418-05 la declara Patrimonio Monumental del pueblo dominicano."],
    ["2012", "Abre la Casa Museo", "Se inaugura el 8 de septiembre."],
    ["2026", "Nuestra visita", "El 26 de septiembre, Sexto EEA del Politécnico Loyola recorre los tres lugares.", true]
  ];
  const tl = document.getElementById("timeline");
  tl.innerHTML = events.map(([y, t, d, me]) =>
    `<li class="${me ? "me" : ""}"><button aria-expanded="false"><b>${y}</b><span class="t">${t}</span></button><div class="d">${d}</div></li>`
  ).join("");
  tl.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const li = btn.parentElement, open = !li.classList.contains("open");
    li.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
  });
  tl.querySelector("li.me").classList.add("open");

  // Map
  window.addEventListener("load", () => {
    if (!window.L) return;
    const stops = [
      [[19.7971, -70.6895], "1. Casa Museo General Gregorio Luperón", "Calle 12 de Julio n.º 54"],
      [[19.80415, -70.69588], "2. Fortaleza San Felipe", "Puntilla del Malecón"],
      [[19.8033, -70.6925], "3. Parque frente al mar", "Junto a la fortaleza"]
    ];
    const origin = [[18.4167, -70.1067], "Salida: San Cristóbal", "Inicio y regreso del viaje"];
    const map = L.map("map", { scrollWheelZoom: false }).setView([19.8, -70.692], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19, attribution: "© OpenStreetMap"
    }).addTo(map);
    const icon = (c) => L.divIcon({ className: "", html: `<span style="display:block;width:16px;height:16px;border-radius:50%;background:${c};border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></span>`, iconSize: [16, 16], iconAnchor: [8, 8] });
    stops.forEach(([ll, t, d]) => L.marker(ll, { icon: icon("#0e6a6f") }).addTo(map).bindPopup(`<b>${t}</b><br>${d}`));
    L.polyline(stops.map(s => s[0]), { color: "#b0532f", weight: 3, dashArray: "6 6" }).addTo(map);
    const o = L.marker(origin[0], { icon: icon("#b0532f") }).bindPopup(`<b>${origin[1]}</b><br>${origin[2]}`);
    const line = L.polyline([origin[0], stops[0][0]], { color: "#b0532f", weight: 2, opacity: .6 });
    let wide = false;
    const btn = document.getElementById("route");
    btn.addEventListener("click", () => {
      wide = !wide;
      if (wide) { o.addTo(map); line.addTo(map); map.fitBounds(L.latLngBounds([origin[0], stops[1][0]]).pad(.2)); btn.textContent = "Volver a Puerto Plata"; }
      else { o.remove(); line.remove(); map.setView([19.8, -70.692], 15); btn.textContent = "Ver la ruta desde San Cristóbal"; }
    });
  });

  // Nav: menu + scroll-spy
  const menu = document.querySelector(".menu"), links = document.getElementById("links");
  menu.addEventListener("click", () => { const o = links.classList.toggle("open"); menu.setAttribute("aria-expanded", o); });
  links.addEventListener("click", e => { if (e.target.matches("a")) links.classList.remove("open"); });
  const navLinks = [...document.querySelectorAll(".nav a.l")];
  const spy = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("section.s[id]").forEach(s => spy.observe(s));

  // Reveal
  const rv = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); rv.unobserve(en.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".rv").forEach(el => rv.observe(el));
})();
