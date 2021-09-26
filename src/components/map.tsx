import FadeIn from "react-fade-in";
import { WorldMap } from "react-svg-worldmap";
import World from "./icons/world";
export default function Map(props: any) {
  return (
    <div className="map">
      <FadeIn>
        <div className="title-map">
          <World></World>
          <h2 style={{ paddingLeft: 20 }}>Total cases around the world</h2>
        </div>

        <div className="map-content">
          <p
            style={{
              fontSize: 24,
              marginTop: 40,
            }}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
            porro corrupti quaerat repudiandae nam aliquam numquam distinctio
            voluptatibus repellat asperiores, nisi deserunt voluptas est minima
            labore blanditiis exercitationem ab! Dolorum.
          </p>

          <WorldMap
            strokeOpacity={0.2}
            color="#38AEBE"
            title=""
            value-suffix="people"
            size="lg"
            valueSuffix="cases"
            backgroundColor="rgba(88, 202, 217, 0)"
            data={props.mapData.filter((e: any) => e.country != null)}
          />
        </div>
      </FadeIn>
    </div>
  );
}
