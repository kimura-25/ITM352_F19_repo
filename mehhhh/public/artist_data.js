//Creating the array for the different artists

artist_data = [
    {
        "name": "Aotearoa’s Finest", 
        "image": "./images/bowl.jpg", 
        "description": "“distinctive New Zealand voice… masters of this new generation” Leading singer/songwriters fuse cultural roots with today",
        "bio": "“We all sing about being Maori in this day and age. We sing about where we come from, who we are, our culture, our tradition, our history and our beliefs…First nation and indigenous people have a feeling of rising up and standing up for our oceans, our land and language…” –Maisey Rika, The Maui NewsMāori singer/songwriters Maisey Rika, Seth Haapu, and Troy Kingi are joined by Aotearoa’s (New Zealand’s) leading practitioner in taonga puoro, traditional Maori instruments, creating music that fuses cultural roots, memorable tunes, and deeply felt, gripping lyrics. <br> Superb musicians and performers, they are at the forefront of New Zealand’s new generation of indigenous performers. Contemporary Maori musicians revered for their artistry, they give voice to today’s Maori culture and social activism. Aotearoa’s Finest has come together as a collective, originally commissioned by WOMAD Taranaki. Headed by Maisey Rika, a singer-songwriter whose powerful, majestic voice captivates audiences worldwide, the group interchanges members for different tours, featuring both leading and emerging Maori singers whose music bridges Maori roots and contemporary sound. Popular favorites in New Zealand, they infuse contemporary indigenous music with powerful traditional roots. <br> Maisey moved from traditional Kapa Haka to a singing career, winning 13 Maori music awards to date. Horomona Horo, composer and cross-genre collaborator, shares taonga puroro, instruments that express and illuminate Maori holistic culture of life, birth, death and nature. Multi-talented Troy Kingi has an active career as an actor, singer-songwriter and multi-instrumentalist. Seth Haapu, of Maori/Tahitian descent, is an Auckland-based pianist, guitarist and singer, with a velvet voice and a soul for inventive melodies. <br> Together, they are Aotearoa’s Finest!" ,
        "genre": "Pacific Roots"
    },
    {
        "name": "", 
        "image": "", 
        "description": "",
        "bio": "" ,
        "genre": ""
    }
];

//If the module is not undefined, have the module export the data from the artist_data array
//From Assignment1_Design_Examples > Asssignment1_2file > product_data.js 
if (typeof module !='undefined') { //if the name of the module is defined
    module.exports=artist_data; //export the artist_data
}