/* ============================================================
   PlantPal — Global State
   src/utils/state.js
   ============================================================ */

const State = (() => {
  let _state = {
    // Onboarding
    onboarded: false,

    // Plant
    chosenPlant: { icon: '🌸', name: 'Cherry' },
    plantLevel:  2,
    xp:          42,
    xpMax:       100,

    // Watering
    waterCount:  2,     // used today
    waterMax:    5,     // daily max
    postCount:   3,     // total outdoor posts

    // Camera / idle
    isIdle:      true,
    timerSec:    5027,  // 2h countdown in seconds

    // Feed
    feedIndex:   0,

    // Current tab on home phone
    currentTab:  'home', // 'home' | 'plant' | 'friends'
  };

  const listeners = [];

  return {
    get: (key)       => key ? _state[key] : { ..._state },
    set: (key, val)  => { _state[key] = val; listeners.forEach(fn => fn(_state)); },
    patch: (partial) => { Object.assign(_state, partial); listeners.forEach(fn => fn(_state)); },
    subscribe: (fn)  => { listeners.push(fn); },

    // Helpers
    calcWaterChance: () => Math.min(Math.round(20 + _state.postCount * 8), 90),
    canWater:        () => _state.waterCount < _state.waterMax,
    canPost:         () => !_state.isIdle,
  };
})();
