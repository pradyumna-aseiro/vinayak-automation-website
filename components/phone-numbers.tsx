import { site } from "@/lib/catalogue";
export function PhoneNumbers() {
  return (
    <div className="phone-groups">
      {site.phones.map((group) => (
        <div key={group.label}>
          <span className="small-label">{group.label}</span>
          <div className="phone-links">
            {group.numbers.map((number) => (
              <a
                key={number}
                href={
                  "tel:" +
                  (number.startsWith("040")
                    ? "+91" + number.slice(1)
                    : number
                  ).replace(/[^+0-9]/g, "")
                }
              >
                {number}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
