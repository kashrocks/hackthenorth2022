const functions = require("firebase-functions");
// make make a firestore write call
const admin = require('firebase-admin');
admin.initializeApp();
const cohere = require('cohere-ai');
cohere.init('NtrdeJfg0Sl3I8khX2ByoN7SdzPoW1lMUcCCl3t6');


// create endpoint that retrieves all threads from firestore database
exports.getThreads = functions.https.onRequest(async (req, res) => {
    const db = admin.firestore();
    var threads = [];
    await db.collection('threads').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                thread = doc.data();
                // testing if the threads have all the right data.
                console.log(doc.id, "THIS IS doc.id")
                if (!thread.name) console.log("ERROR: thread has no name");
                else if (!thread.username) console.log("ERROR: thread has no username");
                else if (!thread.topic) console.log("ERROR: thread has no topic");
                else if (!thread.t1) console.log("ERROR: thread has no t1");
                else if (!thread.t2) console.log("ERROR: thread has no t2");
                else if (!thread.t3) console.log("ERROR: thread has no t3");
                else if (!thread.t4) console.log("ERROR: thread has no t4");

                threads.push(doc.data());
            });
            res.json(threads);
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    // console.log(threads);
});


// // create endpoint that retrieves a specific thread by id from the firestore database
// exports.getThread = functions.https.onRequest(async (req, res) => {
//     const db = admin.firestore();
//     var thread = {};
//     await db.collection('threads').doc(req.query.id).get()
//         .then(doc => {
//             thread = doc.data();
//             res.json(thread);
//         })
//         .catch(err => {
//             console.log('Error getting documents', err);
//         });
//     // console.log(threads);
// })

// create an endpoint that talks to the cohere-ai api
exports.getSpecificThread = functions.https.onRequest(async (req, res) => {
    // get a specific thread from the firestore database
    const db = admin.firestore();
    thread = await db.collection('threads').doc(req.query.id).get()
        .then(doc => {
            return doc.data();
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

    // topic = 'We have lost all touch with dirt, here are 4 easy ways to reconnect with the earth';
    topic = thread.topic;
    model = 'Generate an exciting Twitter thread given a topic.\n--\nTopic: $500K NO NETWORK, NO CONTACTS CHALLENGE Going from $0 to $500K/year with no network and no money is 100% doable if you’re willing to put in the work. Here’s my 4-step playbook that anyone can copy:\nThread: Step 1: Drive for Uber As an Uber driver, you can make $20/hour. Drive for 14 hours/day and you can make $102,000, BEFORE tips. Now here’s the trick: ASK for a tip. $10. Even if only 1 of every 3 people say yes, that’s another $51,000.–– Total: $153,000. Step 2: Post your drives to YouTube & TikTok Think Carpool Karaoke. Entertaining! Your goal is 100K subs by end of year. If you post 2 videos/week, you can make $1K/week from Ads alone. With another $500-1000 from brand partnerships and you have $104,000. –– Total: $257,000. Step 3: Flip items while you drive You’re already driving around, so go flip stuff on Craigslist, FB Maketplace, or Etsy. I have friends making $250,000/year from flipping alone. If you do 40% of that, you have another $100K. –– Total: $357,000. Step 4: I wanna hear from you! You’re 70% of the way there. $140K to go. How do you hit your goal? Let me know in the replies \n-- \nTopic: When you buy a business, you risk bankruptcy -- or worse! I’ve studied over 1,000 businesses for sale in 2022. The 3 biggest traps for you to avoid:\nThread: 1. Buying yourself a job We looked at an event planning business. The owner/CEO managed 100% of the relationships. He had to do this to keep employees from leaving with his customers. So, any owner will always be trapped working in this business. 2. Ask: Why am I the lucky buyer? We looked at a franchise for sale for CHEAP. It seemed a good deal but… Then we asked, “Why did all the other franchisees pass on this?” They passed because it’s a crap franchise concept. Ask: “Why did everyon else pass?\". 3. COVID Blips Future cashflows/profits set the value for a business. You use past performance to predict them. But, COVID created once-in-a-lifetime situations and gov’t stimulus. So, future profits are unpredictable for some companies!\n-- \nTopic: 3 Ways TikTok is breaking Gen Z’s brains. I’m a 23-year-old Gen Z.TikTok burst on the scene in 2020. All my friends got hooked. I’ve watched in horror and fascination how they’ve changed their behavior. Here is what’s changing:\nThread: 1. Manifesting. Gen Z hears that life is hard and stacked against us. Instead of goals, we treat life planning like a wishing well. We tell the universe “I’ll own this Ferrari.” And believe it’ll come true. 2. Attention spans. I spent 13 hours on TikTok last week. I instantly scroll away if something doesn’t immediately interest me. 3-seconds or you’re done. 3. Trend cycling. The infinite “For You Page” brings new trending content daily. Trends move in and out of popularity WAY faster than before. Imagine what this does to our bank accounts. It previously took months or more to get through trends. Now it\'s days.\n--\nTopic: Riding a bike is really hard. It takes such a long time and you endure a lot of pain while learning. Here are 3 tips everyone should know when learning how to ride a bike.\nThread: 1. Get a bike with a coaster brake. It’s the simplest and easiest way to learn how to ride a bike. 2. Find a good instructor. A good instructor can get you going in 1 lesson. The problem is that good instructors are hard to find. 3. Learn how to ride in low traffic. The most dangerous time to learn is on the road with cars. I’ve seen kids get killed riding their bikes. Learning on quieter roads makes it way safer. \n--\nTopic: WATER DOES NOT TASTE LIKE IT DID BEFORE. Water in the good old days used to be succulent. Here are my top 3 reasons why water is not as nutritious or tasty as it was historically.\nThread: 1. Nutrient density: Water has almost zero nutritional value. Zero. It’s been chemically filtered and stripped of its good minerals. 2. Good minerals are hard to get. I’ve tried a lot of different water filters and there’s a lot of guesswork. If the filter removes too much mineral, you don’t taste the water at all. And if it’s not enough, you’ll have a metallic taste. 3. Bottled water is a ripoff. The label says it’s 100% water, but that’s not true. It’s 90% water and 10% other stuff. And it’s expensive. You can buy a case of the same water for $100 and save money in the long run. \n--\nTopic: ',
        model = model + topic;
    model += '\nThread:';

    fullPrediction = await (async () => {
        const response = await cohere.generate({
            model: 'large',
            prompt: model,
            max_tokens: 250,
            temperature: 0.9,
            k: 0,
            p: 0.75,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop_sequences: ["Topic"],
            return_likelihoods: 'NONE'
        });
        // console.log("this is prediction", response.body)
        return response.body.generations[0].text;
    })();

    console.log(fullPrediction);
    numCheck = ['1', '2', '3', '4']
    tweets = []
    last = 0
    for (var i = 0; i < fullPrediction.length; i++) {
        if (i > 0 && fullPrediction[i] == '.' && numCheck.includes(fullPrediction[i - 1]) && fullPrediction[i - 1] != 1) {
            tweets.push(fullPrediction.substring(last, i - 2).trim())
            last = i - 1
        }
        else if (i == fullPrediction.length - 1) {
            tempString = fullPrediction.substring(last, i + 1)
            tempString = tempString.replace("\n--\nTopic", "");
            tweets.push(tempString.trim())
        }
    }
    // add t1 t2 t3 t4 to realTweets array
    realTweets = []
    realTweets.push(thread.t1)
    realTweets.push(thread.t2)
    realTweets.push(thread.t3)
    realTweets.push(thread.t4)

    var aiRight;
    // generate a true or false value and set it to aiRight
    if (Math.random() < 0.5) {
        aiRight = true;
    }
    // full prediction has the full prediction
    res.json({
        aiRight: aiRight,
        name: thread.name, username: thread.username,
        'Topic: ': topic, 'AITweets': tweets, 'realTweets: ': realTweets,

    });

});

