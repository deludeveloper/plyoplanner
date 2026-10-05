// Plain-language explanations shown in the Learn tab.
// Source numbers point into SOURCES below.

export const JOB_INFO = {
  Landing: {
    short: "Teaches your legs to absorb force with your knees in line. Everything else builds on it.",
    long: [
      "Landing drills train the part of a jump most tied to protecting your knees: catching your weight quietly, with your knees tracking over your toes.",
      "Coaches teach landing before anything else, and only move on to continuous jumps once landings are clean. Injury prevention programs that include this kind of jump and landing work have reduced knee injuries, mostly in team sport athletes.",
    ],
    sources: [12],
  },
  Springs: {
    short: "Quick, low hops that train your ankles and Achilles to work like a spring.",
    long: [
      "When your foot is on the ground for less than about a quarter of a second, your tendons stretch and recoil like a spring. That is the same spring you use on every running stride.",
      "Plyometric training has been shown to make the Achilles tendon stiffer, and a short daily hopping routine improved running economy in amateur runners. These drills are low effort, so they fit well before a run.",
    ],
    sources: [6, 11, 1],
  },
  Power: {
    short: "Big single efforts with a longer push off the ground. Builds force. Best on leg day.",
    long: [
      "When your foot stays down longer, your muscles do more of the work and you build force rather than spring.",
      "These are maximal efforts, so they work best on leg day before you lift, while you are fresh. Combining jump training with strength training improves running economy much more than jumping alone.",
    ],
    sources: [5, 4, 9],
  },
  Reactive: {
    short: "Fast, springy jumps that cover ground. The most running-like job, and the hardest.",
    long: [
      "Reactive drills combine short ground contact with high effort: bounds, hops and repeated jumps. They are the closest to running itself.",
      "Studies in trained runners found improvements in running economy and race times after several weeks of this kind of work. Because they are demanding, they come after landing and springs are solid.",
    ],
    sources: [1, 2, 3],
  },
};

export const HOW_IT_WORKS = [
  {
    q: "Why once or twice a week?",
    a: "Lower training frequencies produced jump and sprint gains at least as large as higher ones, and in one study a group training three days a week got sorer and improved less than a group training twice. Small sessions before a run also worked about as well as longer ones when the total jumps matched.",
    sources: [7, 10, 13],
  },
  {
    q: "Why do the exercises rotate?",
    a: "Three exercises from the same job and level do the same work, so swapping them keeps things fresh without changing what you train. Each one comes back every few weeks, so you still get good at it.",
    sources: [],
  },
  {
    q: "What does \"due\" mean?",
    a: "If you haven't done something for 4 weeks, like a sideways or turning jump, it gets marked due and your next picks lean toward it. You don't need everything every week, just regularly.",
    sources: [],
  },
  {
    q: "How do I move up?",
    a: "Each job moves up on its own after 6 sessions at your level, once you've covered every area, logged no pain, and your landings stay quiet and controlled. These checks come from how coaches progress athletes, not from a single study.",
    sources: [12],
  },
  {
    q: "What about single-leg work?",
    a: "An optional hop test unlocks it: hop for distance on each leg, and your shorter hop should be at least 90% of your longer one. That threshold comes from knee rehab, so treat it as a guide rather than a rule.",
    sources: [14],
  },
  {
    q: "How much jumping is this?",
    a: "Roughly 40 to 60 landings a session. Low volumes like this still produced results, and runners already land thousands of times on every run.",
    sources: [8],
  },
  {
    q: "When should I stop?",
    a: "End a set when your landings get loud or your reps slow down. Skip plyometrics if you have a bone stress injury or pain that changes how you run, and get checked first.",
    sources: [],
  },
];

export const ABOUT = [
  "I've been running for several years, trying to prehab with strength training and plyometrics without really knowing what I was doing with the plyos. I'd add a few jumps at the end of a leg day. I knew they were supposed to help, but I was overwhelmed by how many there were, and by the short contact versus long contact business that nobody explained in a way I could act on.",
  "So I spent a few months reading the studies, and this is what I ended up with.",
];

export const SOURCES = {
  1: { cite: "Spurrs, R. W., Murphy, A. J., & Watsford, M. L. (2003). The effect of plyometric training on distance running performance. European Journal of Applied Physiology, 89(1), 1-7.", url: "https://doi.org/10.1007/s00421-002-0741-y" },
  2: { cite: "Saunders, P. U., et al. (2006). Short-term plyometric training improves running economy in highly trained middle and long distance runners. Journal of Strength and Conditioning Research, 20(4), 947-954.", url: "https://pubmed.ncbi.nlm.nih.gov/17149987/" },
  3: { cite: "Turner, A. M., Owings, M., & Schwane, J. A. (2003). Improvement in running economy after 6 weeks of plyometric training. Journal of Strength and Conditioning Research, 17(1), 60-67.", url: "https://journals.lww.com/nsca-jscr/abstract/2003/02000/improvement_in_running_economy_after_6_weeks_of.10.aspx" },
  4: { cite: "Eihara, Y., et al. (2022). Heavy resistance training versus plyometric training for improving running economy and running time trial performance: A systematic review and meta-analysis. Sports Medicine Open, 8, 138.", url: "https://doi.org/10.1186/s40798-022-00511-1" },
  5: { cite: "Dudagoitia Barrio, E., et al. (2023). Effects of plyometric jump training on running economy in endurance runners: A systematic review and meta-analysis. Kinesiology, 55(2), 270-281.", url: "https://hrcak.srce.hr/309864" },
  6: { cite: "Fouré, A., Nordez, A., & Cornu, C. (2010). Plyometric training effects on Achilles tendon stiffness and dissipative properties. Journal of Applied Physiology, 109(3), 849-854.", url: "https://doi.org/10.1152/japplphysiol.01150.2009" },
  7: { cite: "de Villarreal, E. S., et al. (2008). Low and moderate plyometric training frequency produces greater jumping and sprinting gains compared with high frequency. Journal of Strength and Conditioning Research, 22(3), 715-725.", url: "https://doi.org/10.1519/JSC.0b013e318163eade" },
  8: { cite: "Watkins, C. M., et al. (2021). The effect of low-volume preseason plyometric training on force-velocity profiles in semiprofessional rugby union players. Journal of Strength and Conditioning Research, 35(3).", url: "https://pubmed.ncbi.nlm.nih.gov/33395182/" },
  9: { cite: "What do we know about complex-contrast training? A systematic scoping review (2024). Sports Medicine Open.", url: "https://doi.org/10.1186/s40798-024-00771-z" },
  10: { cite: "Plyometric jump training micro- and high-dose effects on amateur basketball players: A randomized controlled trial (2025). Frontiers in Physiology.", url: "https://doi.org/10.3389/fphys.2025.1684022" },
  11: { cite: "Progressive daily hopping exercise improves running economy in amateur runners: A randomized and controlled trial (2023). Scientific Reports.", url: "https://pubmed.ncbi.nlm.nih.gov/36914662/" },
  12: { cite: "Implementing the plyometric continuum to individualise jump and land training. Sportsmith.", url: "https://www.sportsmith.co/articles/implementing-the-plyometric-continuum-to-individualise-jump-and-land-training/" },
  13: { cite: "Can weekly frequency of plyometric training impair strength and power? A short-term comparison in regional-level jump athletes (2025). Frontiers in Physiology.", url: "https://doi.org/10.3389/fphys.2025.1671750" },
  14: { cite: "Plyometric progression for rehabilitation. Physiopedia.", url: "https://www.physio-pedia.com/Plyometric_Progression_for_Rehabilitation" },
};
