# koala-borate.online
backend service to power the ultimate chrome extension, now collaborate (yeah, that's how it's read)

![https://user-images.githubusercontent.com/14032427/112757052-94c35e80-9005-11eb-99ea-a67e121a112a.png](https://user-images.githubusercontent.com/14032427/112757052-94c35e80-9005-11eb-99ea-a67e121a112a.png)

## Features
  All the features are listed on [koala-borate.online](https://koala-borate.online)


## Tech Used
- project structure is completely custom.
- Used datastax cassandra for database
- Not using an ORM, why ? because I want to learn to write CQL queries.
- Using expressv5.0 Alpha already? Yeah because express5.0 adds supports for transporting errors which were thrown from async functions. So it's kinda required for [my package](https://www.npmjs.com/package/http-exception-transformer).