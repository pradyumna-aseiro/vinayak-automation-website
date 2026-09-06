import Image from "next/image";
const companies = [
  ["NTPC", "ntpc", "https://ntpc.co.in/"],
  ["BHEL", "bhel", "https://www.bhel.com/"],
  ["MEIL", "megha", "https://www.meil.in/"],
  ["Toshiba", "toshiba", "https://www.toshiba.com/"],
  ["Amrutanjan", "amrutanjan", "https://www.amrutanjan.com/"],
  ["Aurobindo Pharma", "aurobindo", "https://www.aurobindo.com/"],
  ["TSGENCO", "tspgc", "https://www.tsgenco.co.in/"],
  ["JSW Cement", "jsw", "https://www.jswcement.in/"],
  ["HMWSSB", "hyderabad", "https://www.hyderabadwater.gov.in/"],
  ["Hy-Gro", "hygro", "https://hygrochemicals.com/"],
  ["Medreich", "medreich", "https://www.medreich.com/"],
  ["Neuland", "neuland", "https://www.neulandlabs.com/"],
  ["Penna Cement", "penna", "https://www.pennacement.com/"],
  ["SCCL", "sccl", "https://scclmines.com/"],
  ["Aseiro Industries", "aseiro", "https://www.aseiro.com/"],
];
export function ClientCarousel() {
  return (
    <section className="section client-section" aria-labelledby="clients-title">
      <div className="container">
        <h2 id="clients-title">Our clients and collaborators.</h2>
        <ul className="client-grid" aria-label="Company websites">
          {companies.map(([name, key, url]) => (
            <li key={key}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name + " website (opens in a new tab)"}
              >
                <Image
                  src={
                    "/media/clients/" +
                    key +
                    (key === "aseiro" ? ".png" : ".jpg")
                  }
                  width={150}
                  height={80}
                  alt={name}
                />
                <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
