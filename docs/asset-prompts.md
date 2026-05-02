# Sportech Cinematic — Asset Generation Prompts
**Copy each prompt directly into the AI tool. Drop generated files into `public/cinematic/`.**

---

## Usage Notes

- **Midjourney:** Paste the full prompt including all flags (`--ar`, `--style raw`, `--v 6`, `--q 2`) into the `/imagine` command. Do not shorten the prompt — the length is deliberate.
- **Sora / Runway:** Paste the full description into the prompt field. For Runway Gen-3 add "cinematic, photorealistic, 4K, seamless loop" at the end if there is a style field.
- **File naming:** Name each output exactly as specified. The code will reference these exact paths.
- **Fallback rule:** If a video generation fails or quality is poor, use the corresponding Midjourney still image as a fallback. The Hero and Patented Camera sections have explicit fallbacks.

---

---

# PART 1 — VIDEO CLIPS
### Tool: Sora or Runway Gen-3 Alpha

---

## V1 — `public/cinematic/hero-bg.mp4`
**Used in:** Hero section (full-screen background loop)
**Duration:** 8 seconds, seamless loop
**Tool:** Sora (preferred) or Runway Gen-3

```
Cinematic 8-second seamless loop video. A massive modern football stadium filmed from pitch level at the center circle, looking toward the main south stand. The stadium is completely full — 60,000 fans, every seat occupied, fans holding illuminated phone screens creating a galaxy-like sea of white and gold light across the stands. The pitch is immaculate dark green, wet from recent rain, shallow puddles reflecting the four corner floodlight towers in the foreground grass. A single player silhouette stands at the edge of the center circle, facing away from camera, wearing a dark jersey, head slightly bowed — contemplative, pre-match. The four stadium floodlight towers at each corner cast dramatically overlapping pools of blue-white light across the pitch. The sky above the open stadium is pure black with no stars — absorbed entirely by light pollution. Camera performs an imperceptible slow zoom: scale 1.00 to 1.06 over the full 8 seconds, completely smooth, no camera shake whatsoever. Color grade: near-monochromatic cool — stadium lights are blue-white (5500K color temperature), shadows push to true #0a0a0a near-black, no warm tones except the scattered warm glow of phone screens in the crowd. No text overlays. No visible logos. No identifiable faces. The first and last frames are compositionally identical for seamless looping. Photorealistic. Cinematic 24fps. 4K minimum resolution.
```

---

## V2 — `public/cinematic/player-pov.mp4`
**Used in:** Patented Camera section (right-side video panel)
**Duration:** 6 seconds, seamless loop
**Tool:** Sora (preferred) or Runway Gen-3

```
Cinematic 6-second seamless loop video captured from a jersey-mounted action camera perspective, positioned at chest height on a professional football player — approximately 1.1 meters off the ground. The clip documents a player running from a stadium tunnel onto the pitch. Sequence: the clip begins mid-tunnel — concrete walls either side, overhead fluorescent strip lighting, the tunnel is approximately 4 meters wide and curves slightly. At 1.5 seconds: the tunnel exit opens and the first glimpse of green pitch appears — a bright rectangle of floodlit green against the dark tunnel. At 2.5 seconds: the player emerges fully, the stadium erupts into frame — stands visible on three sides, 50,000+ fans, stadium floodlights blazing from the upper corners of the frame. The camera has authentic jersey-cam motion physics: a pronounced forward bounce rhythm at 2 bounces per second corresponding to running strides, with a subtle lateral sway — this is NOT stabilized footage, the motion is the authenticity. At 4 seconds: the player slows to a walk as they reach the pitch center, the camera rises slightly and catches two stadium lights in the upper frame, creating a natural lens bloom. The pitch grass fills the lower 25% of frame throughout. Color grade: natural, unprocessed sports broadcast look — slightly desaturated overall, deep cool green for the pitch, blue-white stadium lights, shadows are #0a0a0a. The loop point is at the moment just before the tunnel is exited — the transition from darkness to stadium light repeats. No camera stabilization applied. No text. No graphics. No logos. 24fps. Photorealistic. 4K.
```

---

## V3 — `public/cinematic/stadium-crowd-energy.mp4`
**Used in:** Global Reach section (atmospheric background)
**Duration:** 6 seconds, seamless loop
**Tool:** Sora or Runway Gen-3

```
Cinematic 6-second seamless loop aerial drone video looking straight down at a packed 60,000-seat football stadium at night. The drone is at 180 meters altitude, perfectly overhead, with the camera pointing directly down — a true top-down nadir shot. The stadium bowl fills 85% of the frame, the outer concourse and parking structure visible at the edges. The crowd: every seat is filled, fans in predominantly dark clothing with scattered blue, white, and yellow club colors. A Mexican wave is in progress — a visible ripple of fans standing and sitting propagates clockwise around the stadium bowl, completing one full revolution every 6 seconds — perfectly synchronized with the clip duration to create a seamless loop. Thousands of phone screens are held up, creating a texture of white and gold light points across the dark crowd mass. The pitch at center: vivid green with white line markings in sharp detail from above — center circle, penalty areas, halfway line all clearly visible. Stadium perimeter floodlights create white halos along the upper stand edges. The drone rotates clockwise at exactly 8 degrees per 6 seconds — an imperceptible slow orbit. The loop is seamless: the final frame matches the opening frame in both rotation and wave position. No identifiable faces at this altitude. No logos readable. Color grade: desaturated cool overhead perspective, the pitch green is the only fully saturated color element. 24fps. Photorealistic. 4K.
```

---

## V4 — `public/cinematic/riyadh-night.mp4`
**Used in:** Vision 2030 section (atmospheric background)
**Duration:** 8 seconds, seamless loop
**Tool:** Sora or Runway Gen-3

```
Cinematic 8-second seamless loop drone video of the Riyadh, Saudi Arabia city skyline at night. The drone is at 380 meters altitude looking north-northwest across the city from a position south of King Abdullah Financial District. The frame composition: Kingdom Centre Tower (Al-Mamlaka Tower) occupies the center-right of the frame — its distinctive 300-meter height with the sky bridge cutout and illuminated crown at the top are clearly identifiable. The King Abdullah Financial District glass towers cluster to the left-center of frame, their angled facades reflecting city lights. The Al Faisaliyah Tower (the golden ball top) is visible to the right. Foreground: the arterial roads of southern Riyadh create a grid of amber-orange sodium streetlight trails extending to the horizon. The sky: deep black zenith transitioning to a slight amber-grey light pollution horizon glow behind the skyline. Stars are not visible. Camera movement: a slow lateral pan from left to right covering exactly 6 degrees of horizontal angle over 8 seconds — completely smooth, zero vertical movement, zero roll, zero bounce. The loop is seamless: the final frame transitions back to the opening frame with a very gradual cross-dissolve invisible at normal playback speed — or the camera pans back left to re-create the starting position seamlessly. Color grade: precise and architectural — deep navy-black shadows (#0d1020), warm amber-gold street lighting (#d4a017), cool blue-white building illumination, no orange color cast on the sky. This is not a tourist video — it is an establishing shot for a serious business presentation. No text. No overlays. No aircraft in frame. 24fps. Photorealistic. 4K.
```

---

## V5 — `public/cinematic/app-ui-demo.mp4`
**Used in:** App Gallery section (optional ambient context loop)
**Duration:** 5 seconds, seamless loop
**Tool:** Sora or Runway Gen-3

```
Cinematic 5-second seamless loop close-up video of a smartphone screen displaying a premium sports fan engagement mobile application. The phone (iPhone 15 Pro, Space Black titanium) is held at a slight angle — 12 degrees of Y-axis tilt, front-facing — in a dark studio environment with soft directional lighting that creates a thin specular highlight along the phone's titanium edges. The screen content plays as a real-time app interaction. The app uses a royal blue (#1a3a8f) primary background with electric yellow (#faff69) accent elements. Screen sequence across 5 seconds: (0 to 1.5s) A 'Player Camera' grid screen: 2×2 grid of football camera feeds — each feed shows a different match angle (aerial, sideline, player-level, tactical), each feed has a small red 'LIVE' badge and a viewer count (84K, 12K, 204K, 38K). The grid pulses subtly as if receiving live data. (1.5s to 3s) A smooth native iOS swipe gesture transitions to a 'Predict' screen: Al Nassr vs Al Hilal matchup header with club crests, a score prediction interface with +/- controls, a token balance display showing 3,240 PT in yellow. (3s to 5s) Transitions to a 'Wallet' screen showing a digital season pass card in a gradient design (the card art uses the same blue-yellow palette), SAR 449 displayed, and a QR code at bottom. All UI text is clean sans-serif — some labels in English and some in Arabic script. The hand interacting with the screen is slightly blurred, the screen is in sharp focus. Loop point is at a dark transition frame. No third-party logos. No real club crests. 60fps screen content, 30fps outer footage. Photorealistic.
```

---

## V6 — `public/cinematic/data-flow.mp4`
**Used in:** How It Works section (atmospheric background accent)
**Duration:** 4 seconds, seamless loop
**Tool:** Sora or Runway Gen-3

```
Cinematic abstract motion graphics: a 4-second seamless loop of data flow visualization. Pure #0a0a0a near-black background throughout — no gradients, no textures. At the exact mathematical center of the frame: a concentrated point-source node of electric yellow-gold light (#faff69) with a soft radial glow extending 50px radius. From this central node, exactly 12 data-flow lines radiate outward at even 30-degree intervals to the frame edges. Each line is 1 pixel wide, color gradient from #faff69 at the origin fading to rgba(250,255,105,0.15) at the edge, completely straight. Each line carries traveling data pulse dots: bright circular glows 4px diameter, traveling from center to edge at varying speeds (0.8 to 1.4 seconds per trip), staggered so at any given frame there are 15 to 25 pulses simultaneously in motion across all 12 lines. The central node breathes: its glow radius expands from 50px to 85px and contracts back on a 2-second cycle, the opacity cycling from 0.75 to 1.0 simultaneously. At the end of each of the 12 lines where they meet the frame edge: secondary receiver nodes pulse briefly (glow expands 0px to 30px and fades) each time a pulse reaches them — with a 0.1 second delay after pulse arrival. The bottom half of the frame has very slight depth-of-field blur on the lines (suggesting Z-depth into the screen). The loop is mathematically seamless — all pulse positions and node states are identical at frame 0 and frame 120 (4 seconds at 30fps). No text. No icons. No UI elements. Color palette exclusively electric yellow and gold on near-black. 30fps. Ultra high quality render.
```

---

---

# PART 2 — STILL IMAGES
### Tool: Midjourney v6

---

## I1 — `public/cinematic/hero-bg-fallback.jpg`
**Used in:** Hero section (video fallback, also used for OG image)
**Dimensions:** 1920 × 1080px
**Priority:** HIGH — this is the most visible asset on the site

```
Ultra-cinematic aerial sports photograph of a completely packed modern football stadium at night. Camera positioned at 45 meters above the pitch at the south goal line, looking across the full 105-meter pitch length toward the north stand. The full pitch is visible in frame: immaculate dark green pitch with brilliant white line markings, the surface is wet from a pre-match watering — fine moisture reflects the floodlights as a subtle sheen. Every single seat is filled: 60,000 fans, the crowd creating a continuous texture of human forms in dark clothing punctuated by scattered club colors (royal blue, white, yellow). Thousands of fans hold illuminated phone screens creating a galaxy-like star field of white-gold light points across all four stands. The four stadium floodlight towers at each corner are at maximum intensity: each tower has 6 to 8 individual 2000W metal halide lamp clusters, the light is blue-white and hard, creating four overlapping pools of intense illumination across the pitch with visible light columns rising into the black sky. The sky above: absolute #0a0a0a near-black, zero star visibility due to light pollution, the upper frame is pure dark negative space. Color grade: cinematic and precise — shadows are true black (#0a0a0a), the pitch green is deep and rich (#0d2b0d), stadium lights are blue-white (6000K color temperature), no orange or warm tones except the individual warm phone glows scattered through the crowd mass. The pitch markings (center circle, halfway line, penalty areas) are perfectly white and sharp. Depth of field: the near pitch is in sharp focus, the far stand is in very slight softness — f/4 equivalent. No text. No visible logos or club identifiers. No digital artifacts. Shot to the standard of a World Press Photo sports finalist — this must be indistinguishable from a real sports photography credit. --ar 16:9 --style raw --v 6 --q 2
```

---

## I2 — `public/cinematic/player-camera-hardware.jpg`
**Used in:** Patented Camera section (left panel hero image)
**Dimensions:** 1200 × 900px
**Priority:** HIGH — this image carries the entire patent claim visually

```
Premium product photography of a miniature action camera (dimensions approximately 26mm wide × 14mm tall × 9mm deep) physically mounted and attached to a section of professional football jersey fabric. The camera occupies the center of the frame. Extreme macro photography: shot with a 100mm f/2.8 macro lens equivalent — the camera body and jersey fabric fill the frame edge to edge, no background distractions whatsoever. Camera design: black matte anodized aircraft-grade aluminum body, a convex wide-angle dome lens at the front center (clear borosilicate glass dome, 190-degree field of view, the glass perfectly clean with a subtle blue anti-reflection coating visible at the edges of the dome when viewed at this angle). On the top edge of the camera: a single recessed status LED indicator — glowing electric yellow (#faff69), this is the only color accent in the entire photograph. A micro USB-C charging port is visible on the bottom edge. The mounting system: two black stainless steel M3 machine screws secure a small aluminum bracket to the jersey fabric — the screw heads are clean and precisely tightened, no scratches. The jersey fabric: dark navy blue professional polyester athletic fabric, the hexagonal mesh weave pattern (standard football jersey construction) is individually sharp and in focus where it surrounds the mount bracket. The polyester fibers catch the light with a slight microsheen. Lighting setup: a single beauty-dish strobe positioned directly below the camera at 45 degrees angled upward — this creates a dramatic rim-light along the camera's lower aluminum edge that transitions from dark silver on the flat face to a brilliant gold-white specular on the rounded lower edge. The top surface of the camera and the upper jersey fade into deep #0a0a0a shadow. The lens dome receives a single catchlight from the light source — a small white reflection point at the 7 o'clock position on the dome glass. Background: absolute pure #0a0a0a black, no falloff, no gradient, infinite black depth. This is an Apple-level product photography execution applied to sports technology. No hands. No human elements. No branding text on the camera. No brand markings on the jersey fabric. --ar 4:3 --style raw --v 6 --q 2
```

---

## I3 — `public/cinematic/crowd-silhouette.jpg`
**Used in:** Global Reach section (full-width atmospheric band)
**Dimensions:** 1920 × 800px

```
Ultra-wide CinemaScope-ratio cinematic photograph captured from behind the goal at pitch level, camera positioned at floor level of the south stand lower tier, looking directly across the stadium toward the north stand upper tier 120 meters away. The entire north and east/west stands fill the frame from left edge to right edge — no pitch surface visible, no sky visible. The crowd: 40,000+ fans in the visible stands are rendered as a complete mass silhouette — no individual detail, no color, no clothing specifics — a textured organic dark mass occupying the lower two-thirds of the frame. The silhouette edge at the top of the crowd is irregular and human — the bumpy profile of individual heads, shoulders, raised arms, flags held aloft — all absorbed into the near-black silhouette mass (#0a0a0a to #141414). Breaking through the silhouette: thousands of phone screens create scattered light punctures — cold white and gold light points visible through gaps between bodies, giving the silhouette a bioluminescent quality. Above the crowd silhouette: the stadium floodlight arrays on the roof structure — massive LED/halide arrays blazing at maximum output. The light sources are at three positions across the upper frame. Each array creates a hard-edged cone of blue-white light that hits the upper crowd tiers, creating dramatic rim-lighting along the top edge of the crowd silhouette — a brilliant white rim of light defines the crowd's upper contour against the dark roof structure beyond. Stadium roof structural steel: visible above the light arrays in silhouette — trusses and tensile cables form geometric patterns against the light bloom. Color palette: exclusively #faff69 and blue-white for the light sources and rim-lighting, #0a0a0a to #1a1a1a for the crowd mass and background structure, scattered warm gold-white for the phone screens within the crowd. No warm tones. No color in the image except the yellow of stadium lights and the cold white of phone screens. Shot with an ultra-wide cinema anamorphic lens — slight horizontal barrel distortion at extreme edges is acceptable and authentic. --ar 21:9 --style raw --v 6 --q 2
```

---

## I4 — `public/cinematic/sport-football.jpg`
**Used in:** Sports Scope grid — Football tile background
**Dimensions:** 800 × 600px

```
Hyper-realistic macro sports photograph of an official football (soccer ball) at rest on a wet professional pitch at night. The ball occupies the lower-right 65% of the frame — its equator is at the center of the frame, the ball's front face fills the foreground. The ball: Adidas-style construction — 32-panel design with alternating black pentagonal and white hexagonal panels, the panel seam edges are raised and precisely defined. The ball surface is covered in water droplets of varying sizes: small beads on the flat panel faces, larger drops accumulating along the seams, each water droplet is individually sharp at this macro scale. Each water droplet acts as a fisheye lens — inside each drop, a miniature inverted reflection of the stadium floodlight array above is visible. The grass immediately around and under the ball: individual blades of professional stadium Bermuda grass, dark deep green (#0d2b0d), also carrying fine water beads. Two individual grass blades lay against the ball surface. Depth of field: the front face of the ball is at maximum sharpness, the back hemisphere of the ball softens, the background is a smooth bokeh field. Background bokeh: the out-of-focus stadium floodlights at distance create large circular bokeh discs of blue-white light — 8 to 12 visible disc-shaped flares in the upper third of the frame. Color palette: the black panels are true #0a0a0a, the white panels are pure white, the grass is #0d2b0d deep green, the bokeh flares are blue-white, the water droplets are near-colorless with the reflected light tinting them blue-white. Photographed with a 180mm f/2 macro lens at ground level — the camera is in the grass, looking slightly upward at the ball, giving the ball monumental scale. No motion blur — the ball is completely static. No human elements. No branding or logo on the ball. --ar 4:3 --style raw --v 6 --q 2
```

---

## I5 — `public/cinematic/sport-basketball.jpg`
**Used in:** Sports Scope grid — Basketball tile background
**Dimensions:** 800 × 600px

```
Cinematic freeze-frame sports photograph of a basketball at the peak of its arc above an NBA-regulation basketball rim. The ball is positioned in the upper-left quadrant of the frame, perfectly sharp — captured at 1/8000th second shutter speed, no motion blur. The ball: official NBA Spalding style, orange-brown pebbled leather with black seam channels, the eight panel lines and two horizontal seams visible in sharp detail. The ball is at the precise apex of its trajectory — it appears to float, slightly angled with the valve stem visible. The rim: positioned center-right of the frame, angled at 35 degrees from the camera's perspective. The orange-painted steel rim is sharp, a section of the white rectangular backboard visible above it. From the bottom of the net, red and white nylon net cords hang down — the first 6 inches in focus, the rest blurring as the net depth increases. Arena environment: the basket is surrounded by total darkness in the mid-ground — the player and court surface are both off-frame, creating an impression of the ball floating in darkness. Background: the upper arena ceiling structure is visible — industrial steel trusses with multiple professional LED spotlights creating hard-edged cones of blue-white light directed downward. The ceiling is in the top 30% of the frame. Lens flare: a single authentic photographic lens flare — a horizontal streak of blue-to-white light extends from the nearest and brightest arena spotlight, crossing behind the ball at mid-frame. This is a natural optical artifact from a fast prime lens, not a graphic overlay. Color palette: the ball's orange-brown is the only warm element in the entire frame — everything surrounding it is cool blue-grey shadows and blue-white light sources. --ar 4:3 --style raw --v 6 --q 2
```

---

## I6 — `public/cinematic/sport-tennis.jpg`
**Used in:** Sports Scope grid — Tennis tile background
**Dimensions:** 800 × 600px

```
Cinematic overhead crane photograph taken from 28 meters directly above a professional hard-court tennis court at night during a match. True top-down nadir perspective — the camera looks straight down, no horizon visible. The entire court fills 80% of the frame: the court surface is deep royal blue (#1a3a8f) hard acrylic, the line markings are brilliant white — all court boundaries, service lines, service boxes, center line, and doubles alleys clearly defined in sharp contrast. A single tennis player is in mid-serve at the far baseline (top of frame): the full body visible from above, a twist of the torso in full service rotation, the serving arm fully extended upward with the racquet in horizontal motion — the racquet head is a blur streak (0.5-stop motion blur on equipment, player body sharp). The tennis ball: a small bright yellow-green sphere positioned 1.5 meters above the player's toss hand, sharp, at the peak of the toss. The floodlight towers: four structures at the court corners visible from above — their LED array tops are bright points of blue-white light, casting rectangular pools of illumination across the court surface. Court surface reflections: the blue hard court surface has a subtle sheen from overnight moisture, the floodlight reflections create diffuse rectangular soft highlights on the playing surface. Perimeter: beyond the court boundaries, the viewing area and court surround are in shadow. Color palette: deep royal blue for the court, pure white for the lines, yellow-green for the ball, blue-white for the lights, player outfit is white — all against #0a0a0a surrounding shadow. --ar 4:3 --style raw --v 6 --q 2
```

---

## I7 — `public/cinematic/sport-cricket.jpg`
**Used in:** Sports Scope grid — Cricket tile background
**Dimensions:** 800 × 600px

```
Extreme macro sports photograph of a used Dukes red cricket ball on a cricket pitch surface. The ball is positioned at the center of the frame, occupying 40% of the frame width. Camera is at pitch surface level, looking very slightly upward at the ball — the ball appears slightly monumental at this angle. The ball: Dukes-style hand-stitched red leather cricket ball, the leather is slightly worn from 40 overs of play — the lacquer is intact on one hemisphere (the shiny side, facing the camera) and worn on the other (the rough side, turned away). The primary seam runs horizontally across the equator of the ball as viewed: 6 rows of raised white linen stitching, the thread individually visible, each stitch showing the needle entry and exit holes in the leather. Secondary quarter-seams are faintly visible. The pitch surface: compacted clay, sandy beige-cream color, the surface is cracked in two places — a fine 3mm crack runs through the pitch beneath the ball (a worn good-length spot). Individual grains of the clay surface are visible in macro detail. Lighting: a single stadium floodlight source off-frame to the right at 30 degrees elevation creates a strongly lateral key light across the ball — the shiny hemisphere on the left is brilliantly lit, the seam creates a shadow valley, the right side falls to near-black. A faint fill from the ground reflection creates slight detail in the shadow. Color palette: deep rich crimson-red for the shiny leather (#8b0000 to #c0392b), pure white for the seam stitching, sandy beige for the pitch surface, near-black for the deep shadows. Background: extremely shallow depth of field — 5 meters behind the ball, the pitch continues as an out-of-focus sandy blur. --ar 4:3 --style raw --v 6 --q 2
```

---

## I8 — `public/cinematic/sport-golf.jpg`
**Used in:** Sports Scope grid — Golf tile background
**Dimensions:** 800 × 600px

```
Cinematic landscape photograph of a championship links golf course at the precise moment of late civil twilight — 9 minutes after sunset, no direct sun visible on the horizon. A single golfer is the sole human element in the frame, positioned center-right, at the moment of full backswing: completely in silhouette — zero skin tone, zero clothing detail, pure black organic shape against the sky. The backswing form is technically correct: full shoulder turn, left arm straight, club shaft pointing at 50 degrees above horizontal toward the sky, the clubhead is at the silhouette's highest point. The golf course: a Scottish or Irish links style — undulating fairway in the left half of the frame, rough grass and coastal vegetation in the foreground, a natural water hazard (small coastal tidal pool or burn) in the mid-ground reflecting the last twilight colors. No other players. No golf cart. No course markers visible. The sky: this is the decisive element — a gradient from deep navy-black (#0d1020) at the zenith transitioning to a band of deep gold-amber (#b8860b) on the horizon directly behind the golfer silhouette. A single dramatic cloud formation catches the last residual skylight from below: the cloud undersides are lit in orange-gold (#d4a017), the cloud tops are deep navy. No sun. No stars yet — this is the transition moment. Foreground grass: in silhouette, dark green-black, fine grass blades catch a faint warm edge light from the horizon glow. Color temperature: cool (#0d1020) at top of frame, warm (#d4a017) at the horizon band, shifting through the full twilight gradient. This image must have the quality and mood of a Tourism Ireland or VisitScotland prestige campaign photograph. --ar 4:3 --style raw --v 6 --q 2
```

---

## I9 — `public/cinematic/sport-swimming.jpg`
**Used in:** Sports Scope grid — Swimming tile background
**Dimensions:** 800 × 600px

```
Cinematic underwater sports photograph taken from directly below and at a 30-degree upward angle, inside an Olympic swimming pool. A single competitive swimmer is the sole subject, positioned diagonally in the frame from lower-left to upper-right. The swimmer is in the freestyle stroke, captured at the catch phase: right arm fully extended forward in the water (pulling phase beginning), left arm mid-recovery pulled back to the hip, the body is slightly rolled to the right. The swimmer wears a dark navy Lycra competition suit and dark polarized goggles — the form is that of a high-performance athlete, body line elongated and hydrodynamic. The water medium: ultra-clear chlorinated competition pool water, color a deep aqua blue (#0a2a4a to #0d3a5e). From this underwater angle looking slightly upward: the pool surface is visible in the upper 35% of the frame — the surface appears as a mirror of silver-white light with complex distortion patterns from the swimmer's stroke turbulence. A fine stream of air bubbles escapes from the swimmer's mouth, rising in a curved stream toward the surface — the bubbles catch the surface light and glow white against the blue water. Caustic light patterns: the pool floor is visible at the bottom 20% of the frame — the sunlight (or pool floodlight) refracting through the water surface creates dancing geometric patterns of bright aqua-white caustics across the pool floor tiles. Lane rope: partially visible to the right side of frame — orange and white float discs in slight blur. Color palette: deep royal blue dominates (#0a2a4a), the surface mirror is silver-white, the swimmer is dark navy and white, the caustics are bright aqua-white (#7fdbff), the bubbles are pure white. This photograph should feel like a Speedo Olympic campaign or Sports Illustrated underwater feature. --ar 4:3 --style raw --v 6 --q 2
```

---

## I10 — `public/cinematic/sport-athletics.jpg`
**Used in:** Sports Scope grid — Athletics tile background
**Dimensions:** 800 × 600px

```
Extreme close-up macro photograph of the precise millisecond of a sprint start: a sprinter's lower legs and feet leaving the starting blocks, captured at 1/10,000th of a second shutter speed — everything is frozen with absolute sharpness. The frame is filled entirely from edge to edge with the track surface, starting blocks, and lower leg elements — no head, no torso, no sky, no crowd visible. The starting blocks: professional Omega Sprint Start Block design, black hard-coated aluminum frame with angled rubber foot pedals (rear pedal at 65 degrees, front pedal at 45 degrees), the rear right foot just milliseconds after leaving the rear pedal — still at zero elevation as the drive begins. The right spike shoe: fully extended leg pushing off, the spikes (9 pyramid-shaped steel needles in the spike plate) are creating micro-depressions in the track surface as the final force is applied. The left leg: extended forward mid-stride, the spike shoe already clearing the starting block. Track surface: World Athletics-certified polyurethane surface, the color is a deep terracotta red (#8b3a3a to #b54040), the aggregate texture is visible at this macro scale — individual rubber granules and embedded aggregate chips in the surface are sharp. The blocks are bolted to the track surface through angled metal spikes — these are sharp and perfectly focused. Lighting: stadium floodlights at 30 degrees from frame left create dramatic raking light across the track surface, emphasizing the granular texture and creating sharp shadows under the starting block frame and each spike plate. Color palette: terracotta-red track, gun-metal silver of the block hardware, the athlete's spike shoes are black with white accents, the leg skin is neutral-warm (no specific ethnicity implied), shadows are #0a0a0a. No other athletes' feet or blocks visible. --ar 4:3 --style raw --v 6 --q 2
```

---

## I11 — `public/cinematic/sport-mma.jpg`
**Used in:** Sports Scope grid — Combat Sports / MMA tile background
**Dimensions:** 800 × 600px

```
Cinematic interior sports photograph of an empty professional MMA octagon cage at a major arena, during the pre-event production window — the arena is set up, the seats are empty, only the production lighting is active. Camera is positioned inside the octagon at floor level near the chain-link fence at one of the eight flat wall sections, looking across the interior of the cage toward the opposite wall. The camera is at canvas height — approximately 0.2 meters off the floor. The octagon canvas: circular vinyl floor covering, the Octagon's shape is defined by eight equal-length straight edges. The canvas is black with white geometric markings — the octagonal perimeter line, compass-point markers at each fence post, and center of the canvas. The canvas is immaculate — unused, no wear, no stains. Chain-link fence: the fence rises 1.8 meters from the canvas edge. The diamond-mesh steel chain-link pattern is sharp in the immediate foreground where it runs vertically, becoming progressively out-of-focus as it recedes around the octagonal perimeter. The fence posts (8 steel poles at each corner) are visible. Production spotlights: 4 professional theatrical Fresnel spotlights suspended from the arena rigging above the cage, positioned above the center of the octagon. Each spotlight projects a hard-edged cone of blue-white light that converges on the center canvas — the center of the octagon receives the combined light of all 4 fixtures, creating a brilliant white pool of light with hard shadows at the edges. Outside this central light cone: the arena beyond the fence is in deep shadow. The first 2 rows of empty arena chairs are faintly visible as dark shapes beyond the fence — enough to suggest scale, not enough to be distracting. Color palette: the lit canvas is high-contrast black and white, the production spotlights are blue-white (#e8f0ff), the arena beyond the fence is #0a0a0a near-black, the chain-link fence is gun-metal grey where lit, disappearing to black in shadow. No fighters. No personnel. No event branding. No text visible. --ar 4:3 --style raw --v 6 --q 2
```

---

## I12 — `public/cinematic/vision-pattern.jpg`
**Used in:** Vision 2030 section (full-width tileable background)
**Dimensions:** 1920 × 600px — must tile seamlessly horizontally
**Note:** Use `--tile` flag for seamless tiling

```
A seamlessly horizontally-tileable ultra-high-resolution geometric pattern in the tradition of traditional Islamic Arabesque architectural ornament, specifically referencing the geometric tile and plasterwork traditions of Arabian Peninsula architecture — the muqarnas and geometric lattice work of Saudi palace architecture, the geometric facades of Al-Ula and Diriyah heritage sites, and the contemporary geometric aesthetic of NEOM and Diriyah Gate Development Authority architectural branding. The pattern construction: an 8-fold symmetric interlocking design based on an underlying octagonal grid. The primary motifs: 8-pointed star formations (khatam) interlocking with irregular hexagons and triangular fillets to fill the plane without gaps or overlaps. The geometry is mathematically precise — this is architectural drafting quality, not hand-drawn folk art. The pattern is complex enough to reward close inspection but legible at thumbnail size. Line work only: zero fill color in any polygon — the design is entirely composed of outline strokes, no areas of solid color except the background. The stroke lines: uniform hairline width of 1.2px at full resolution, color #c8960c (warm dark gold), slightly warmer than #d4a017 to read more subtly. Background: very deep navy-black (#080c18) — not pure black, but deep cool navy. The pattern density: moderately detailed — approximately 8 star formations visible across a 1920px width. The pattern must tile seamlessly both horizontally and vertically. At full display size the individual line work is sharp and precise. The overall composition feels architectural and sophisticated — it should evoke the craftsmanship of Islamic geometric art without being a tourist cliché. No figurative elements. No calligraphy. No Arabic text. No human forms. No natural forms — purely geometric. No color other than the dark gold lines on deep navy. --ar 16:5 --style raw --v 6 --tile
```

---

## I13 — `public/cinematic/cta-glow.jpg`
**Used in:** Final CTA section (full-screen background)
**Dimensions:** 1440 × 900px

```
Abstract photographic light study: a single radial glow of electric yellow-gold light emanating from the exact mathematical center of the frame, photographed against a perfectly uniform near-black background. This is a photograph of light itself — there is no physical object, no scene, no context. The image is created through long-exposure photography of a single bright point light source through multiple diffusion layers, or through photorealistic CGI rendering indistinguishable from photography. The glow structure: At the absolute center of the frame — a concentrated bright point of electric yellow (#faff69) at maximum luminosity, approximately 4px diameter when the image is at full resolution. Expanding radially outward in perfect circles: at 3% of the frame radius: still #faff69 at near-full brightness. At 8% radius: the color transitions to warm yellow (#f5e642). At 18% radius: the color shifts to golden yellow (#d4a017), luminosity falling to 50%. At 30% radius: amber-gold (#b8860b), luminosity at 25%. At 45% radius: deep amber (#8b6914), luminosity at 8%. At 60% radius: the glow fades completely into the background, luminosity at 0%. The transition between these color stops is continuous and perfectly smooth — no visible banding. The background beyond the glow: absolute uniform #0a0a0a, no texture, no noise, no vignette gradient — the glow itself provides all the atmospheric treatment. Lens rays: 4 extremely faint starburst rays extend from the center to the frame edges at 12, 3, 6, and 9 o'clock positions — these are very subtle, at approximately 3% opacity — a real optical artifact from a lens aperture, not a graphic effect. These rays are only visible on close inspection. The glow is not perfectly symmetric — it has a very subtle (2% eccentricity) natural variation, as a real light source has. This image will be used as a blend-mode background layer in web design. It must have the photographic quality of a professional light study. --ar 16:10 --style raw --v 6 --q 2
```

---

## Checklist

**Videos (6 total):**
- [ ] `public/cinematic/hero-bg.mp4`
- [ ] `public/cinematic/player-pov.mp4`
- [ ] `public/cinematic/stadium-crowd-energy.mp4`
- [ ] `public/cinematic/riyadh-night.mp4`
- [ ] `public/cinematic/app-ui-demo.mp4`
- [ ] `public/cinematic/data-flow.mp4`

**Images (13 total):**
- [ ] `public/cinematic/hero-bg-fallback.jpg`
- [ ] `public/cinematic/player-camera-hardware.jpg`
- [ ] `public/cinematic/crowd-silhouette.jpg`
- [ ] `public/cinematic/sport-football.jpg`
- [ ] `public/cinematic/sport-basketball.jpg`
- [ ] `public/cinematic/sport-tennis.jpg`
- [ ] `public/cinematic/sport-cricket.jpg`
- [ ] `public/cinematic/sport-golf.jpg`
- [ ] `public/cinematic/sport-swimming.jpg`
- [ ] `public/cinematic/sport-athletics.jpg`
- [ ] `public/cinematic/sport-mma.jpg`
- [ ] `public/cinematic/vision-pattern.jpg`
- [ ] `public/cinematic/cta-glow.jpg`

**When done:** Drop all files into `public/cinematic/` and tell Claude — implementation begins immediately.
