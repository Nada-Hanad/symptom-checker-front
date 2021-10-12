import FadeIn from 'react-fade-in';
import { WorldMap } from 'react-svg-worldmap';
import World from './icons/world';
export default function Map(props: any) {
  return (
    <div className='map'>
      <FadeIn>
        <div className='title-map'>
          <World></World>
          <h2 style={{ paddingLeft: 20, fontFamily: 'Poppins' }}>
            Total cases around the world
          </h2>
        </div>

        <div className='map-content'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <p
              style={{
                fontSize: 24,
                marginTop: 40,

                fontFamily: 'Montserrat'
              }}
            >
              The world map provided shows the total of Covid 19 cases around
              the globe. The darker the color, the more cases the country has
              recorded.
            </p>
            <br />
          </div>

          <WorldMap
            strokeOpacity={0.2}
            color='#38AEBE'
            title=''
            value-suffix='people'
            size='lg'
            valueSuffix='cases'
            backgroundColor='rgba(88, 202, 217, 0)'
            data={props.mapData.filter((e: any) => e.country != null)}
          />
        </div>
      </FadeIn>
    </div>
  );
}
