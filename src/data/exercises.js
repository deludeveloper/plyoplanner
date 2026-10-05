// The exercise library.
// job: Landing | Springs | Power | Reactive
// legs: Two | Alternating | One      dir: Up | Forward | Side | Rotate
// equip: "" (none) | Box | Hurdles | Rope | Stairs | Hill
// sets x reps is the starting dose. "per" adds a note like "each leg".
// yt is a YouTube video id for a demo. Missing ids fall back to a YouTube search.

const RAW = [
  // name, job, level, legs, dir, equip, sets, reps, per, cue, yt
  ["Snap down", "Landing", 1, "Two", "Up", "", 2, 5, "", "Rise onto your toes, drop fast into a quarter squat and freeze.", ""],
  ["Drop landing", "Landing", 1, "Two", "Up", "Box", 2, 4, "", "Step off a low box, land quietly and hold for two seconds.", "GZLyZCqF8BQ"],
  ["Squat jump and stick", "Landing", 1, "Two", "Up", "", 2, 5, "", "Jump up, land soft, hold the landing before the next rep.", ""],
  ["Broad jump and stick", "Landing", 1, "Two", "Forward", "", 2, 4, "", "Jump forward and freeze in a quarter squat, knees over toes.", "x9qlFXfQaZU"],
  ["90° jump and stick", "Landing", 1, "Two", "Rotate", "", 2, 5, "", "Jump and turn a quarter, land facing the new way and hold.", ""],
  ["180° jump and stick", "Landing", 2, "Two", "Rotate", "", 2, 4, "", "Jump and turn halfway, land balanced and hold.", "_-Q5ywo24_s"],
  ["Lateral bound and stick", "Landing", 2, "One", "Side", "", 2, 4, "each side", "Push off one leg, land on the other and hold for two seconds.", "soqQy4dzEts"],
  ["Diagonal bound and stick", "Landing", 2, "One", "Forward", "", 2, 4, "each side", "Bound forward and out at an angle, hold the landing.", ""],
  ["Hop and stick", "Landing", 2, "One", "Forward", "", 2, 4, "each leg", "Hop forward on one leg and freeze on landing.", ""],
  ["Single-leg 90° hop and stick", "Landing", 3, "One", "Rotate", "", 2, 3, "each leg", "Hop and turn a quarter on one leg, hold the landing.", ""],
  ["Single-leg drop landing", "Landing", 3, "One", "Up", "Box", 2, 3, "each leg", "Step off a low box onto one leg, absorb quietly.", ""],
  ["Single-leg hurdle hop and stick", "Landing", 3, "One", "Forward", "Hurdles", 2, 3, "each leg", "Hop one low hurdle on one leg and stick it.", ""],

  ["Pogo hops", "Springs", 1, "Two", "Up", "", 2, 15, "", "Stiff ankles, bounce off the balls of your feet.", "7SIfCcfP4g0"],
  ["Line hops", "Springs", 1, "Two", "Forward", "", 2, 12, "", "Hop forward and back over a line. Quick, not high.", "muT_bGI1Joo"],
  ["Side line hops", "Springs", 1, "Two", "Side", "", 2, 12, "", "Hop side to side over a line. Knees stay quiet.", "VWqjYpga6gY"],
  ["Twist pogos", "Springs", 1, "Two", "Rotate", "", 2, 12, "", "Small hops turning your hips left and right, shoulders stay forward.", ""],
  ["Jump rope", "Springs", 1, "Two", "Up", "Rope", 2, 30, "", "Light, quick contacts. Stay tall.", "FJmRQ5iTXKE"],
  ["A-skips", "Springs", 1, "Alternating", "Forward", "", 2, 10, "each leg", "Drive the knee, snap the foot down under your hip.", "692E8jdhSA8"],
  ["B-skips", "Springs", 1, "Alternating", "Forward", "", 2, 8, "each leg", "Like an A-skip, but reach the leg out, then snap it down under your hip.", ""],
  ["Ankling", "Springs", 1, "Alternating", "Forward", "", 2, 12, "each leg", "Short, quick steps rolling over the ball of the foot.", ""],
  ["Quarter-turn pogos", "Springs", 2, "Two", "Rotate", "", 2, 12, "", "Pogo hops turning a quarter each hop, all the way around.", ""],
  ["Box pattern hops", "Springs", 2, "Two", "Side", "", 2, 12, "", "Hop forward, side, back, side around a square.", ""],
  ["Straight-leg bounds", "Springs", 2, "Alternating", "Forward", "", 2, 10, "each leg", "Stiff legs, pull the ground back under you with quick contacts.", ""],
  ["Single-leg pogos", "Springs", 2, "One", "Up", "", 2, 10, "each leg", "Same bounce on one foot. Switch legs halfway.", "Yq75-6SUn7A"],
  ["Scissor hops", "Springs", 2, "Alternating", "Forward", "", 2, 12, "", "Small hops switching which foot is in front each time.", ""],
  ["Alternating jump rope", "Springs", 2, "Alternating", "Up", "Rope", 2, 30, "", "Jog in place over the rope, one foot at a time.", ""],
  ["Single-leg line hops", "Springs", 3, "One", "Forward", "", 2, 10, "each leg", "Forward and back over a line on one foot.", ""],
  ["Single-leg side line hops", "Springs", 3, "One", "Side", "", 2, 10, "each leg", "Side to side over a line on one foot.", ""],
  ["Single-leg quarter-turn hops", "Springs", 3, "One", "Rotate", "", 2, 8, "each leg", "Small one-foot hops turning a quarter each time.", ""],

  ["Squat jump", "Power", 1, "Two", "Up", "", 3, 4, "", "Jump up tall from a squat, land soft, reset each rep.", "qv3hoZqSk3c"],
  ["Countermovement jump", "Power", 1, "Two", "Up", "", 3, 4, "", "Dip fast and jump straight up as high as you can.", "3bSbksBXIwI"],
  ["Box jump", "Power", 1, "Two", "Up", "Box", 3, 4, "", "Jump onto the box, land soft, step down. Never jump down.", "d2z2_rRkpAo"],
  ["Broad jump", "Power", 1, "Two", "Forward", "", 3, 3, "", "Swing your arms, jump as far as you can, stick it.", "x9qlFXfQaZU"],
  ["Lateral jump", "Power", 1, "Two", "Side", "", 3, 3, "each side", "Jump sideways as far as you can off both feet.", ""],
  ["180° squat jump", "Power", 2, "Two", "Rotate", "", 3, 3, "each way", "Jump as high as you can while turning halfway.", "_-Q5ywo24_s"],
  ["Rotational broad jump", "Power", 2, "Two", "Rotate", "", 3, 3, "each way", "Jump forward and land turned a quarter to the side.", ""],
  ["Split squat jump", "Power", 2, "Alternating", "Up", "", 3, 3, "each leg", "Switch legs in the air, land balanced in a lunge.", "CK7xI0wa04g"],
  ["Tuck jump", "Power", 2, "Two", "Up", "", 3, 4, "", "Knees up toward your chest, land tall.", "-bnJGikRGsM"],
  ["Lateral box jump", "Power", 2, "Two", "Side", "Box", 3, 3, "each side", "Jump sideways onto the box, step down.", "kJqEVtWkYHo"],
  ["Single-leg box jump", "Power", 3, "One", "Up", "Box", 3, 3, "each leg", "Jump onto a low box from one leg, step down.", ""],
  ["Single-leg broad jump", "Power", 3, "One", "Forward", "", 3, 2, "each leg", "Jump forward off one leg, land on two.", "U1F5uebdUcw"],

  ["Power skips for height", "Reactive", 1, "Alternating", "Up", "", 2, 8, "each leg", "Skip as high as you can, knee and opposite arm up.", "9OzQRwrzxn4"],
  ["Power skips for distance", "Reactive", 1, "Alternating", "Forward", "", 2, 8, "each leg", "Skip as far as you can each stride.", "iJGycGF-iQE"],
  ["Skater bounds", "Reactive", 1, "One", "Side", "", 2, 6, "each side", "Push sideways from leg to leg without pausing.", "usZgF8TBWcA"],
  ["Zigzag hops", "Reactive", 1, "Two", "Side", "", 2, 8, "", "Hop diagonally down a line, quick off the floor.", "0VZG7CZA50E"],
  ["Stair hops", "Reactive", 1, "Two", "Up", "Stairs", 2, 8, "", "Hop up stairs one step at a time, both feet. Walk down.", ""],
  ["Hill bounds", "Reactive", 2, "Alternating", "Forward", "Hill", 2, 8, "each leg", "Bound up a gentle hill. The slope softens each landing. Walk down.", ""],
  ["Hurdle hops", "Reactive", 2, "Two", "Up", "Hurdles", 2, 5, "", "Hop low hurdles back to back, spring off each landing.", "r47D5ITtVf0"],
  ["Lateral hurdle hops", "Reactive", 2, "Two", "Side", "Hurdles", 2, 8, "", "Hop sideways over a cone or hurdle and straight back.", "xxPzM3S2IJU"],
  ["Repeated broad jumps", "Reactive", 2, "Two", "Forward", "", 2, 4, "", "Land and go straight into the next jump.", "tQ-vJh-G7EI"],
  ["Continuous 180° jumps", "Reactive", 2, "Two", "Rotate", "", 2, 6, "", "Turn halfway each jump with no pause between.", ""],
  ["Alternate-leg bounds", "Reactive", 2, "Alternating", "Forward", "", 2, 8, "each leg", "Long strides, float between landings.", "eIjuMzIFREs"],
  ["Standing triple jump", "Reactive", 2, "Alternating", "Forward", "", 2, 3, "", "Two feet, one foot, land on two.", "idm5DuQqf7I"],
  ["Tuck jump series", "Reactive", 2, "Two", "Up", "", 2, 5, "", "Tuck jumps back to back, no sinking between.", "-bnJGikRGsM"],
  ["Single-leg bounds", "Reactive", 3, "One", "Forward", "", 2, 4, "each leg", "Bound forward on one leg. Few reps, full effort.", "I7ChaipZVM4"],
  ["Single-leg hurdle hops", "Reactive", 3, "One", "Up", "Hurdles", 2, 4, "each leg", "Low hurdles on one leg, quiet and quick.", "re0M7vc3yuU"],
  ["Single-leg lateral hops", "Reactive", 3, "One", "Side", "", 2, 6, "each leg", "Hop side to side on one leg without pausing.", "k6j7BtPzRog"],
  ["Single-leg stair hops", "Reactive", 3, "One", "Up", "Stairs", 2, 5, "each leg", "Hop up stairs on one foot, one step at a time. Walk down.", ""],
  ["Single-leg 90° hop series", "Reactive", 3, "One", "Rotate", "", 2, 4, "each leg", "One-leg hops turning a quarter each time, continuous.", ""],
];

const slug = (s) => s.toLowerCase().replace(/°/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const EXERCISES = RAW.map(([name, job, level, legs, dir, equip, sets, reps, per, cue, yt]) => ({
  id: slug(name), name, job, level, legs, dir, equip, sets, reps, per, cue, yt,
}));

export const BY_ID = Object.fromEntries(EXERCISES.map((e) => [e.id, e]));

export const demoUrl = (e) =>
  e.yt
    ? `https://www.youtube.com/watch?v=${e.yt}`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(e.name + " plyometric how to")}`;

export const doseText = (e) => `${e.sets} × ${e.reps}${e.per ? " " + e.per : ""}`;

export const JOBS = ["Landing", "Springs", "Power", "Reactive"];
export const DIRS = ["Up", "Forward", "Side", "Rotate"];
export const LEGS = ["Two", "Alternating", "One"];

export const tagLabel = (t) => ({ One: "One-leg work", Two: "Two-foot work", Alternating: "Alternating legs", Rotate: "Turning", Side: "Sideways", Up: "Vertical", Forward: "Forward" }[t] || t);
