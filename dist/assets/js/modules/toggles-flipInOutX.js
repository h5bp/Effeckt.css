// __________    __  __               ___                    __________                        ___                   
// `MMMMMMMMM   69MM69MM              `MM                    MMMMMMMMMM                        `MM                   
//  MM      \  6M' 6M' `               MM        /           /   MM   \                         MM                   
//  MM        _MM__MM______     ____   MM   __  /M               MM   _____     __       __     MM   ____     ____   
//  MM    ,   MMMMMMMM6MMMMb   6MMMMb. MM   d' /MMMMM            MM  6MMMMMb   6MMbMMM  6MMbMMM MM  6MMMMb   6MMMMb\ 
//  MMMMMMM    MM  MM6M'  `Mb 6M'   Mb MM  d'   MM               MM 6M'   `Mb 6M'`Mb   6M'`Mb   MM 6M'  `Mb MM'    ` 
//  MM    `    MM  MMMM    MM MM    `' MM d'    MM               MM MM     MM MM  MM   MM  MM   MM MM    MM YM.      
//  MM         MM  MMMMMMMMMM MM       MMdM.    MM               MM MM     MM YM.,M9   YM.,M9   MM MMMMMMMM  YMMMMb  
//  MM         MM  MMMM       MM       MMPYM.   MM               MM MM     MM  YMM9     YMM9    MM MM            `Mb 
//  MM      /  MM  MMYM    d9 YM.   d9 MM  YM.  YM.  ,           MM YM.   ,M9 (M       (M       MM YM    d9 L    ,MM 
// _MMMMMMMMM _MM__MM_YMMMM9   YMMMM9 _MM_  YM._ YMMM9          _MM_ YMMMMM9   YMMMMb.  YMMMMb._MM_ YMMMM9  MYMMMM9  
//                                                                            6M    Yb 6M    Yb                      
//                                                                            YM.   d9 YM.   d9           FlipInOutX            
//                                                                             YMMMM9   YMMMM9     
// ASCII Text to Art Generator
// http://patorjk.com/software/taag


// You might not like what you see here and that's fine.
// Change what you feel to make it awesome. This is purely
// a sketch to begin lighting the fire.

var toggleTriggerFlipInOutX = $('[data-toggle-trigger="effeckt-flipInX"]'),
		toggleContentFlipInOutX = $('.effeckt-togglecontent__flipInX');

// Crap ass JS I know. If you can help me make it better 
// please feel free to coach me so I can get better.
toggleTriggerFlipInOutX.on('click', function() {
  if( toggleContentFlipInOutX.hasClass('visuallyhidden') ) {
    toggleContentFlipInOutX.toggleClass('visuallyhidden effeckt-toggle__flipInX');
  }else {
    toggleContentFlipInOutX.toggleClass('effeckt-toggle__flipOutX');
  }
});