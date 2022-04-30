const fs = require("fs");
const { exec } = require("child_process");

// Use metaboss to interact with Metaplex

const main = () => {
  const content = fs.readFileSync(
    "../arweave-image-uploader/public/arweave-uris.json",
    "utf-8"
  );
  const parsed = JSON.parse(content);
  const nftUris = parsed;

  nftUris.forEach((uri) => {
    console.log("uri", uri);
    // Mint
    exec(
      `metaboss mint one --external-metadata-uri ${uri} --keypair ${process.env.KEYPAIR} --receiver ${process.env.RECEIVER} --immutable --primary-sale-happened`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`${error}`);
          return;
        }
        console.log(`${stdout}`);
        console.error(`${stderr}`);

        // Extract mint
        const regex = /[A-HJ-NP-Za-km-z1-9]{40,50}/g;
        const nftMint = stdout.match(regex)[1];
        console.log(`nftMint: ${nftMint}`);
      }
    );
  });
};

main();