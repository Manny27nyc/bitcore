/*
 * Copyright (c) 2008–2025 Manuel J. Nieves (a.k.a. Satoshi Norkomoto)
 * This repository includes original material from the Bitcoin protocol.
 *
 * Redistribution requires this notice remain intact.
 * Derivative works must state derivative status.
 * Commercial use requires licensing.
 *
 * GPG Signed: B4EC 7343 AB0D BF24
 * Contact: Fordamboy1@gmail.com
 */
/*
 * Copyright (c) 2008–2025 Manuel J. Nieves (a.k.a. Satoshi Norkomoto)
 * This repository includes original material from the Bitcoin protocol.
 *
 * Redistribution requires this notice remain intact.
 * Derivative works must state derivative status.
 * Commercial use requires licensing.
 *
 * GPG Signed: B4EC 7343 AB0D BF24
 * Contact: Fordamboy1@gmail.com
 */
var keyPair = {
  priv: '0dea92f1df6675085b5cdd965487bb862f84f2755bcb56fa45dbf5b387a6c4a0',
  pub: '026092daeed8ecb2212869395770e956ffc9bf453f803e700f64ffa70c97a00d80',
};

var copayers = [{
  id44btc: '626452e5e0e35df4d9ae4d3e60653c9ae9a814f00c84dc40f5887069b18e2110',
  id44bch: '671fee02a6c1c4de2e2609f9f9a6180dc03acfff6b759fe0b13a616ed4880065',
  id45: 'e7467366d5754be2b7d386c9737ab87214c26314bdc3489702e09c719be1bdb7',
  xPrivKey: 'xprv9s21ZrQH143K2n4rV4AtAJFptEmd1tNMKCcSyQBCSuN5eq1dCUhcv6KQJS49joRxu8NNdFxy8yuwTtzCPNYUZvVGC7EPRm2st2cvE7oyTbB',
  xPubKey: 'xpub661MyMwAqRbcFG9Kb5htXSCZSGc7RM6CgRY3mnap1Eu4XdLmk21sTtdt9iWAiL64KazU3QWrYEYSRAKgLvkMRe8JMxffDvt4AhCDzyMsnsT',
  xPrivKey_45H: 'xprv9upyD5bqT9HDgybvt15zN7VZk9TyTzenFuBktJfyweXtVSr9eNYpnBWQQvzxaW8kDWLeiddLu9brYma5WdtD1Maev4aGUfJjiy9EBc1QSFg',
  xPubKey_45H: 'xpub68pKcb8jHWqWuTgPz2czjFSJJBJTsTNdd87Mgh5bVz4sNFBJBus5KyptGBWgA4V6LGCi12s4Mw4S1JC2GkqX4NJ4kfQ47XqRZLbyM2DY9Jd',
  xPrivKey_44H_0H_0H: 'xprv9zWRZ7CXrC4z9xA9RRBFXohmPKbyCajWaCNTHPtwNeJwTnysHG5QK7WMqpNLVtvqGxts7WNcNtqBLfdaFdCGknDPXjLKt2E2BUrPaFDqrLh',
  xPubKey_44H_0H_0H: 'xpub6DVmxcjRgZdHNSEcXSiFtweVwMSTc3TMwRJ45nJYvyqvLbK1poPerupqh87rSoz27wvckb1CKnGZoLmLXSZyNGZtVd7neqSvdwJL6fceQpe',

  xPrivKey_44H_0H_0Ht: 'tprv8ZgxMBicQKsPcxUEtgtQ2wKpkmuNKS6R2w3UmFTUHHURv4PKGE2aGkkbQEcQs9gGsoW4zPr7VM98xdbjQuWc3cZ6bkEyKy1sywhV9gLUcUi',
  xPubKey_44H_0H_0Ht: 'tpubD6NzVbkrYhZ4WRW2nLYzSLywKoRJUmHKcEeG3mVmhZGpkYe5tcrATFNTaQRAWM3dzL2QyXoctpjkaAXruDXyc6xkF4EDGu3eQdwZXFzoFSW',
  xPubKey_44H_0H_0HtSAME: 'tpubDDsQUrZ7PqajeERTydhM6rysGUY7bRxRV3tMSLMhGtbp5syiu2Ek1MVfwACdyJwFurTXNAX4rt6cVXFwvJRDFi2BZDs6LN7ADttjrf3JHrD',
  xPrivKey_1H: 'xprv9upyD5bqT9HBkWym7TvTH3njEzTnjrtkLB2sg3DD2CxxA5hZKGee1sYJUtD8C4QaeATLXQ33TirRzRhuTGDBA6XRoYDMwfXAj1KSmGyNBio',
  xPubKey_1H: 'xpub68pKcb8jHWqUy14EDVTTeBjTo2JH9KcbhPxUURcpaYVw2t2hroxtZfrnLBw1bWzBrHbEJA48QmZ8DB9gTvhphKSitC15SiYx9k2ncGh55Hq',
  privKey_1H_0: 'a710be25950738a7d13637e2e09affd7f579a3479fd7cc024bd9459f8fba6659',
  pubKey_1H_0: '026e3020913420a5b9425952627f0a074c9235e7a329869b322061f786e997ae0d'
}, {
  id44btc: '842c048066e7d10ae1bbf67edccf69f2e5ff9a754d0c2b5524f0d01a87d6acbb',
  id44bch: '0d8f0c0ebfb11ad589002fd4539075c6fb625fb1725406ca442726c6bc6746b1',
  id45: 'ee75154b646277c8d0d256fc1a0aa0470e4c3435497f208092c865737040b55b',
  xPrivKey: 'xprv9s21ZrQH143K3BwkLceWNLUsgES15JoZuv8BZfnmDRcCGtDooUAPhY8KovhCWcRLXUun5AYL5vVtUNRrmPEibtfk9ongxAGLXZzEHifpvwZ',
  xPubKey: 'xpub661MyMwAqRbcFg2DSeBWjURcEGGVUmXRH93nN4CNmm9B9gYxM1UeFLSofD6gtMnRYeucgPjfrWNxaAEhiT4di6HLty8Un6aheCKev4REvhZ',
  xPrivKey_45H: 'xprv9uHco76yN7arptqnjGr7LiC9VqvXhTYjYeZ4k9MU6kfrX8zBme1gRM2jbBxxt3zfeKBkmpQK4FQ2XFXXkJd2rBE2qoPdMjfC4xvxJ8iqqPW',
  xPubKey_45H: 'xpub68GyCcdsCV9A3NvFqJP7hr8t3sm26vGausUfYXm5f6CqPwKLKBKvy9MDSUA6ot6WMzXCWFyWCFfZyhcqK4uZGPZL83rKW9KfuGLPJ6P38Ex',
  xPrivKey_44H_0H_0H: 'xprv9yBDgTV58cC2XLCp3bGpe6tvmVHxJdE2GTkqM64TUjgRdp4vBnaF4QoMrsz3BjmFQDEx4nPaC4tfk7GUrNFpJZmQgxvp1H7FoveXA7rAPqH',
  xPubKey_44H_0H_0H: 'xpub6CAa5y1xxykKjpHH9coq1EqfKX8Si5wsdggS9UU535DQWcQ4jKtVcD7qi9TCvhV31N3QCLdEaftLjNdXv8R72XiorEnrTfn1ULjA35RgQVp',
  xPrivKey_1H: 'xprv9uHco76yN7aptKFWZW9Cc9KQhwDbFMDeK1C5jBTrN8JKUinAzAZt9G7fL5rcDBQYtXWT7umm4r91tx3kJRZKPKVkd35dzgfwMBLUxBHneAY',
  xPubKey_1H: 'xpub68GyCcdsCV986oKyfXgCyHG9Fy45eowVgE7gXZsTvTqJMX7KXht8h4S9BLnHyWx8YbT8kRX5v4xnZAZvHmdUSdQhvZ2q97PG8m8Ef86yjzK',
  privKey_1H_0: 'ee062ce6dc5ece50e8110646b5e858c98dba9315cdfdd19da85ab0d33dcac74a',
  pubKey_1H_0: '02c679bf169233a273dec87fae5a1830481866c4e96a350d56346ac267808c905d'
}, {
  id44btc: '719f4ee61c691fbf0ebefa34e2151a1a3dbe39cf2fa4a498cb6af53600d30d1a',
  id44bch: '56ed2c8d04c4aa29e9d6408724197c27d1fa0b71e2c2a6b91a4cf9710f09eb0a',
  id45: 'acd666d7c677d9f2c85b55a5fad1610fe272eac46ef7a577c7aeeab0b1474e43',
  xPrivKey: 'xprv9s21ZrQH143K3xgLzxd6SuWqG5Zp1iUmyGgSsJVhdQNeTzAqBFvXXLZqZzFZqocTx4HD9vUVYU27At5i8q46LmBXXL97fo4H9C3tHm4BnjY',
  xPubKey: 'xpub661MyMwAqRbcGSkp6zA6p3TZp7QJRBCdLVc3fguKBjudLnVyioEn58tKRFPmGMkdGJWMX69mgZWHKrKmpQ3fwBXeFjLc5Sd2rnxcQthSW42',
  xPrivKey_45H: 'xprv9vGShhcT8rDFomkiF72D5UXt5BsVydntE7rYbKaa9qtscnWVHaZSPkV9N9SkDkhWbDvkmTGVLYKJf23Z8QjXMRRMTwQYLj26VkPbsKxnUwV',
  xPubKey_45H: 'xpub69Fo7D9LyDmZ2FqBM8ZDScUcdDhzP6WjbLn9PhzBiBRrVaqdq7sgwYodDPUzXyGxpEfTCQyTAA9baAwCApmTiing2S7KTQTmLZjw3Wmaojn',
  xPrivKey_44H_0H_0H: 'xprv9yVpGpTwwtc5aNLkACpuAWmyBUZy1hYy22WQ58Cx614fM7oHpYyjrWbYbExMtZa3sTTywU9mziYBoSZtR4rXVhvfvoVmqZPsYysvpYNUDrk',
  xPubKey_44H_0H_0H: 'xpub6CVAgKzqnGANnrRDGEMuXeihjWQTRAGpPFRzsWcZeLbeDv8SN6HzQJv2SWxg2QSQ7GABwgZJb9KzK8yTXB44CRkqy3cMGEEzniWvBKRCGr5',
  xPrivKey_1H: 'xprv9vGShhcT8rDDu2FvheGgrGvcg5JLQce7kXqC2VnhyYdnggErZA2KJjDwSvQhFZtBVH8T7QQd7JTDXVSvgEijvoYdvCeoRyjQL5EnHRUZgre',
  xPubKey_1H: 'xpub69Fo7D9LyDmX7WLPofohDQsME78pp5My7kknptCKXtAmZUa16hLZrXYRJCL7wLWtTWzMvEn1HKQ8uzp4iLbkS72WPJsLTLayGPw7HGh6hEW',
  privKey_1H_0: '5009c8488e9a364fc24a999d99a81ae955271de1d06d46c2f2f09e20c6281b04',
  pubKey_1H_0: '03338a3b7c08e9d9832e1baff0758e08f9cc691497dd6e91d4c191cd960fb2f043'
}, {
  id44btc: 'e225a29864060823df67b98432b070a40aad1bf9af517005b0b5fe09c96e29c9',
  id44bch: '2baf290be693407fd9c32597608b6fd90ba60f65b2b81b58e9fe9c960938de11',
  id45: 'c65a89f64794cb7e1886c7010a32dd6fa362d3e81710bac32e97e325b9109fd8',
  xPrivKey: 'xprv9s21ZrQH143K48nfuK14gKJtML7eQzV2dAH1RaqAMj8v2zs79uaavA9UTWMxpBdgbMH2mhJLeKGq8AFA6GDnFyWP4rLmknqZAfgFFV718vo',
  xPubKey: 'xpub661MyMwAqRbcGcs91LY53TFcuMx8pTCszPCcDyEmv4ftuoCFhStqTxTxJoy35yjp2H3qQtxDYGe1gtkZu4T7mR7ARK1MLYte2fptZVt6hkD',
  xPrivKey_45H: 'xprv9vYQ7HC96LzvDwJ2r99m4ALTEtXTfUCHPbs7gpPzWboFP3NFgzMjXPf9Pp7D3vmTUqRtsZfSfVghvUhLKGGAs3LdVf9rf89TgRAvqAWMSwN',
  xPubKey_45H: 'xpub69XkWnj2viZDSRNVxAgmRJHBnvMx4vv8kpniVCoc4wLEFqhQEXfz5BydF79LoErgaokMLv7u2sRNsoiJqjr5nyfBqJGykfR3kvCex7z8Ar3',
  xPrivKey_44H_0H_0H: 'xprv9yn1LP3ViLTXUYgZP5sDFG94H6sd8v5AKRBbd35Ub5FjPq2HuzC9bAb6LReTXRSA4XTtYvzwpiktvuRrLY98df2KZMCuyZxXUB7FpBQ2ndA',
  xPubKey_44H_0H_0H: 'xpub6CmMjtaPYi1ph2m2V7QDcQ5nq8i7YNo1ge7CRRV69QniGdMSTXWQ8xuaBiNt74nJCMZjaeNgRbMiZmdgrEqogvjARnBx8k4y853MZGAkjmo',
  xPrivKey_1H: 'xprv9vYQ7HC96LztKQouECporZgezbjktKyhipWavsJvEJ4ok577RxVcmnyeRUUbAqmq5FnuhDie62Z962xNvF9JwAXoJZx2VeJPUWMPHsuoAkM',
  xPubKey_1H: 'xpub69XkWnj2viZBXttNLEMpDhdPYdaFHnhZ63SBjFiXndbncsSFyVosKbJ8GjGMT7LX1rF6aisHM2YmFKye7bR3xQn5Bj875iGxyVrbRF7k5N8',
  privKey_1H_0: '460ee692f05de66b5d8e2fa1d005a8b6bdb1442e2ce6b3facfcee2f9012c9474',
  pubKey_1H_0: '03d0e0c526619b158aac9a8de8082f439df43d389ec50cb54386c3d87cfde4c99b'
}, {
  id44btc: '120416cd4c427a7e4d94213cebe242f56a06bc6dd5c5c6cae27dc920a0ddf1fb',
  id44bch: '4abc36e7731c08e0a93483691c3cb451013463ccee1b676e4a20d98cd1de8af3',
  id45: '65ae087eb9efdc7e0ada3a7ef954285e9e5ba4b8c7ab2d36747ddd286f7a334f',
  xPrivKey: 'xprv9s21ZrQH143K44Bb9G3EVNmLfAUKjTBAA2YtKxF4zc8SLV1o15JBoddhGHE9PGLXePMbEsSjCCvTvP3fUv6yMXZrnHigBboRBn2DmNoJkJg',
  xPubKey: 'xpub661MyMwAqRbcGYG4FHaErWi5DCJp8uu1XFUV8LegYwfRDHLwYccSMRxB7Z3L1NgKychKdXQvbVEyDhSwNnNnnNKh9mBEAdQ5tv2guK8ywKU',
  xPrivKey_45H: 'xprv9vKBPQfZS4jWfLtSAoSeBHdLU1yJicKVmhTdbewKwQWU2CPdm61scXvKXHaMshmDEBaspUc994GAzZK1x7PtfzZ2PGtGHHhJhDn3yoT8gAi',
  xPubKey_45H: 'xpub69JXnvCTGSHospxuGpyeYRa523oo853M8vPEQ3LwVk3StzinJdL8ALEoNa8AwwJsAWrfFtwfDgTCB9o1kKwn9n2tdN9nbdrw2zs5rNqQpM2',
  xPrivKey_44H_0H_0H: 'xprv9xuBGYz7dmjgyroeDKMKyjSCiWyqskWavGjLPJbC9W32TkTy8NqXX4y5WQKcK24SnGiDMpUhFUNqjh284RjHoNYC2gUKagKfVfWZqn1gey4',
  xPubKey_44H_0H_0H: 'xpub6BtXg4X1U9HzCLt7KLtLLsNwGYpLHDESHVewBgzohqa1LYo7fv9n4sHZMdzdBh5pxiAgLyUvsAqAQ5J1CRK4uA9htCWbKbVxFsfMEij3MDA',
  xPrivKey_1H: 'xprv9vKBPQfZS4jUjK546Cjyf8ZgtEvRhQyjfuE89DAnYatevTusA8wwXiDxEFPSFk4fp8wwC5nRGmkSnTi9ascW9LJjujm2g36eGocNMtEsDwX',
  xPubKey_1H: 'xpub69JXnvCTGSHmwo9XCEGz2GWRSGkv6shb389iwbaQ6vRdoGF1hgGC5WYS5YhxaM6RpfzsbPJqfR7iCLdEMSMUYvhaG4tvmEsn8ztwtysjgp8',
  privKey_1H_0: '7a5158b92d9ed4cb9644ddbd472b43428832a5f3bb91a481532a081908e62b2e',
  pubKey_1H_0: '02b47d5c977c93c883f369165ebc2b564d14a52712ec6892f7097fa99e0d36ca20'
}, {
  id44btc: '85de9f025ee190fab7cb1bd9b6772c64df26188ce705d4f258c5adaf7bc610f9',
  id44bch: '0845739e508fb8f7b28e10bed9d827968a12d2dbd6ecbac3303305fcaf535bfe',
  id45: 'dacc5c350cef4449a3ca12939711c7449d0d6189e5e7f33cff60095a7a29b0f9',
  xPrivKey: 'xprv9s21ZrQH143K48PpVxrh71KdViTFhAaiDSVtNFkmbWNYjwwwPbTrcqoVXsgBfue3Gq9b71hQeEbk67JgtTBcpYgKLF8pTwVnGz56f1BaCYt',
  xPubKey: 'xpub661MyMwAqRbcGcUHbzPhU9GN3kHk6dJZafRVAeAP9quXckH5w8n7Ae7yP8e2Zh6SPPKFn2K6oE3GBpcz9QzfJTNRWXbY7w1L3nGLE5beZL1',
  xPrivKey_45H: 'xprv9u8SxxhEJB4pzk6P3VKwmRRFqgHX94kBHDTBDaFXeaMS7dggkQcf2Tt14AvTvMJYjpogB2bVgmkHEW4Ze1iVzZeF5S5FLj6zpqwyrwh9yRW',
  xPubKey_45H: 'xpub687oNUE88Yd8DEAr9Wrx8ZMzPi81YXU2eSNn1xf9CutQzS1qHwvuaGCUuTHJXkvzrRSiRtuJid3LsPaS3hUAdahdy3ZpQCcsLEQjC2Q2tNT',
  xPrivKey_44H_0H_0H: 'xprv9yTxyEKAvyMLaocWZ4rXUUC7xWUqzhcvDJc2Ms7fndKaSfityJdaGrhLCSsLZz2E9NG3VkhbbsYwZVW9J5W3BQegyWWNsuEKmkdCsr9DRkM',
  xPubKey_44H_0H_0H: 'xpub6CTKNjr4mLudoHgyf6PXqc8rWYKLQALmaXXdAFXHLxrZKU43Wqwppf1p3kj8sC9b9Sx5uqXfnATdvz5jeFYKELnngksCzwABLfNcW8CPkfg',
  xPrivKey_1H: 'xprv9u8SxxhEJB4o6KfWV3csVTsJzhePBtMz8CmJCcn83vaWSiydgv6CADdbxjq3YsnusKPyPw1G235KibW67VjdbJ2ZoTG4nFA6ivwPRBmScKW',
  xPubKey_1H: 'xpub687oNUE88Yd6Jojyb59srbp3YjUsbM5qVRgu11BjcG7VKXJnETQSi1x5p3onkhodzQcydFLTkZ3ym35UmAAWrjLY4rDAt2RjHKidx6AzgVz',
  privKey_1H_0: '3c49816d4e83d8758f89e8e104e3566a8a61426a9b7d4945b34212fbbb8e8290',
  pubKey_1H_0: '0307ab8c0d8eea1fe3c3781050a69e71f9e7c8cc8476a77103e08a461506a0e780'
}, {
  id44btc: '4d0c1eaab0aafc08aea7328f9ed1d3fc2812791ad2ebb9cbc1a8537b51b18afa',
  id44bch: '63ed91d8b7c4f06028d4a795cbb30d91772d93c99e7cc612d9f0b33a4fa215de',
  id45: '9129a0454adcf659f4f9d65a9b4dc4f9793bd1f59664268b56a7ef73f29f1b8a',
  xPrivKey: 'xprv9s21ZrQH143K3pgRcRBRnmcxNkNNLmJrpneMkEXY6o5TWBuJLMfdRpAWdb2cG3yxbL4DxfpUnQpjfQUmwPdVrRGoDJmtAf5u8cyqKCoDV97',
  xPubKey: 'xpub661MyMwAqRbcGJktiSiS9uZgvnCrkE2iC1ZxYcw9f8cSNzESstysycUzUsDCU6KnnjR29VZ1eRAXDgEXfYxGw1B9E7VLSAcHa9UuifSozmy',
  xPrivKey_45H: 'xprv9um7h3RnANyeDTTn7SCVckpA65rWTL7MExcta2iz8BaDqxNic6Gmjgv9GfYVs95x5tQJUpeJiuoApbnrwZQQZja5uUQxaySV7wMBV3P27qn',
  xPubKey_45H: 'xpub68kU6YxfzkXwRwYFDTjVytkte7gzrnqCcBYVNR8bgX7Cikhs9db2HVEd7yFQVRV19xJ93DHh64fr5jDyWssXGuSt5AsiBurY3eaffcwjafa',
  xPrivKey_44H_0H_0H: 'xprv9z9zXfC9effsNS9zXSD4XBUjuEqh6d5ofeF3xqSZPuq1DwAhTDZVuzpNwWfzTgpTm42s6DicHaG2eWesUQ8Cm8Es7kKyt1tCq6W9VM6ot4H',
  xPubKey_44H_0H_0H: 'xpub6D9LwAj3V3EAavETdTk4tKRUTGgBW5of2sAemDrAxFMz6jVqzkskTo8rnq5DsoAnTyqnukWsPG7JueVLwLAN6vLXA4MpYceDPQbA6WuFfiV',
  xPrivKey_1H: 'xprv9um7h3RnANycGJkyD9iAZy2BUkMpWr6SDV5WzgNYTRjAqX4WpYS7b8Xn8hGLiwmUhCvXnwhdhPEVejSpGVKFD1mxLDy7NSJ5C5oK4SELwJu',
  xPubKey_1H: 'xpub68kU6YxfzkXuUnqSKBFAw6xv2nCJvJpHai17o4nA1mG9iKPfN5kN8vrFyzU2hYTBcVcDNoxcDbyqcauCxYJZpQLFzDnaHY5Uej3FCvYwU1P',
  privKey_1H_0: '87f8a2b92dd04d2782c3d40a34f09f2ab42076bd02b81fbe4a4a72f87ad2e6df',
  pubKey_1H_0: '02a0370d6f1213ab3390ac666585614ad71146f3f28ec326e2e779f999c1a497eb'
}, {
  id44btc: '5ae7b75deb3b4d7e251f1fc5613904c9ef8548af7601d93ef668299be4f75ddd',
  id44bch: '375a87b5614473ad359fee0385e9ffcb01d78c7880b34987e59da06eeac8029a',
  id45: '37b81e2544b43ce7f37a132a748426e1566ecbb758564d4d7d07b716fbe1b368',
  xPrivKey: 'xprv9s21ZrQH143K3nvcmdjDDDZbDJHpfWZCUiunwraZdcamYcafHvUnZfV51fivH9FPyfo12NyKH5JDxGLsQePyWKtTiJx3pkEaiwxsMLkVapp',
  xPubKey: 'xpub661MyMwAqRbcGH15sfGDaMWKmL8K4yH3qwqPkEzBBx7kRQuoqTo37ToYrvLJh7JpV5FQSverERMcdF4HcP1UCiie2ayeMXRq67zr75PzMKs',
  xPrivKey_45H: 'xprv9twbreBMkWvwgk9kvzrdygVdir22YSi1dMwMd3GzdhjAD6seKqFidYpehhNR2JL3p41Yeun8ELYAs9pCvKqeH1mu2tQc4PZgWKAUJpaanKo',
  xPubKey_45H: 'xpub67vxG9iFatVEuEEE32PeLpSNGsrWwuRrzarxRRgcC3G95uCnsNZyBM98Z145fPbqMgjVG4fPpKrsU7hbq33cpmPXAFF23VMCp7e9ucCGm2v',
  xPrivKey_44H_0H_0H: 'xprv9yKWzK3qGKoWD7vkUpPhHQSUvyPrFBL2nBkZHDQPqjZfiR3ws6tL7LoGtrUqSye8cBeCFUzHZhG4i8RPqQuVQGVXgG6dGi2sor5SLh8bN59',
  xPubKey_44H_0H_0H: 'xpub6CJsPpaj6hMoRc1DaqvheYPDV1ELee3t9QgA5bp1Q56ebDP6QeCaf97kk9SZPvxDkxt9RGmZBNdDyAyyHMfWDXYmJgAd1dutwgVaLQraVC4',
  xPrivKey_1H: 'xprv9twbreBMkWvukJn57LL7aqa4vY9Zg8w8A19uUuDFqzuauaHoRmVTaETtfArRsvzdz41FY9pgLXJspuAF1nadXPTRSBgpNKoUwPM4eWTehSp',
  xPubKey_1H: 'xpub67vxG9iFatVCxnrYDMs7wyWoUZz45beyXE5WHHcsQLSZnNcwyJoi82nNWSfrNKeqRnGpCuFGcsTuHi6zEBucxRJDgZbfyny2sUs88ZaMey1',
  privKey_1H_0: '66230b6b8b65725162ea43313fcc233f4f0dd135cea00d04b73a84d3f681ef25',
  pubKey_1H_0: '03f148bde0784c80051acd159b28a30022e685aca56418f8f50100d9f8a0192c37'
}, {
  id44btc: '98e78a9cb2ab340a245c5082897eadb28c367319f97b93e7b51b4d5ca5cdc68e',
  id44bch: 'f390e03140593c0c724e0d3a2a9cf39d63319edc833024a149a72efacb368737',
  id45: 'e1557d3421a8884fe007674f3f0b6f0feafa76289a0edcc5ec736161b4d02257',
  xPrivKey: 'xprv9s21ZrQH143K2uYgqtYtphEQkFAgiWSqahFUWjgCdKykJagiNDz6Lf7xRVQdtZ7MvkhX9V3pEcK3xTAWZ6Y6ecJqrXnCpzrH9GSHn8wyrT5',
  xPubKey: 'xpub661MyMwAqRbcFPd9wv5uBqB9JH1B7yAgwvB5K85pBfWjBP1rumJLtTSSGnCdsJSXfwmTyexsRjbUhzB4J6LWfL8mC2Ka117JrnXetyCzk3r',
  xPrivKey_45H: 'xprv9vQyc56VRojih8sHwa4gitBJsva7TiRnMg3pBUxFR8NRGNxAbAr3vEb9iH8fxTZmmEnvzLee5DVUckDYJKfRnuxVz6Nm4Wpq1mbHE3K7WeK',
  xPubKey_45H: 'xpub69QL1adPGBJ1ucwm3bbh6283RxQbsB9dityQysMryTuQ9BHK8iAJU2udZZNN2t3MNSGnzFiu97BUCjjMUAXqb4caURCMEStMorDU3y3NtgB',
  xPrivKey_44H_0H_0H: 'xprv9yowiefD68DG79Xh3J6wAo8u5aTwZ32bsa5jtB4qgKS7r6Tszm42ovSgu7naNPCwT2wt42BXFR4sviY6PEpihhz8LRoHVj2v8WRydzEzqfd',
  xPubKey_44H_0H_0H: 'xpub6CoJ8AC6vVmZKdcA9KdwXw5ddcJRxVkTEo1LgZUTEey6ito2YJNHMimAkPuaZ1NCZ1iYAadqQrCvYvrwDzb6wdJpjWWK4EBzmg6mUtVdJZ5',
  xPrivKey_1H: 'xprv9vQyc56VRojgmQtXPaDpf5Y1zzmA3aH1SQUwbxqJDJEbjbZSHzpuXmabA2Lx5WThvw1srKUcNez2U4ovSh237mi6bNMufk5XrUcYbXLam2u',
  xPubKey_1H: 'xpub69QL1adPGBHyytxzVbkq2DUkZ2beT2zrodQYQMEumdmacPtaqY9A5Zu51KMp7cEgWVsZCADGtqFiLoVzaarkMLXxiVYBSebSBSMZWYkNVr9',
  privKey_1H_0: '9e215580c8e5876215ad101ded325bcacc5ab9d97b26e8fdfab89ef5bb6e0ab7',
  pubKey_1H_0: '0265d33caaa128a77cc38ab8751c7d730e0274a212f1f65b73f637eddb3a3fb151'
}, {
  id44btc: 'f716dbeec58e44c698b34c2d81bae4699ed5a5a522281733ec50aa03caf76a19',
  id44bch: 'da39b3d560d2d99d9557a5a70ca3dc4561c3930e2850748fa80bdcecb650a9bf',
  id45: '8a6d840580549a34422c9b150dbd1e96e369c5db69ee736caab95616f8abb22b',
  xPrivKey: 'xprv9s21ZrQH143K2wcRMP75tAEL5JnUx4xU2AbUBQzVVUDP7DHZJkjF3kaRE7tcnPLLLL9PGjYTWTJmCQPaQ4GGzgWEUFJ6snwJG9YnQHBFRNR',
  xPubKey: 'xpub661MyMwAqRbcFRgtTQe6FJB4dLcyMXgKPPX4yoQ73okMz1chrJ3VbYtu5PRTxMBGuXt6eyqwAuG2BEBzQPLc1x8gnSQiATS3GRzKi1BuQAR',
  xPrivKey_45H: 'xprv9vDicbkxQi4VK49bqmGuj4FSMSuzubjDVBqqwjBxJzUJ9JhQDtF45Nb1ex13D82uqkLyM6YhknAHZ2s4GjuYxQGySECGU82eGkrKi1Pct9v',
  xPubKey_45H: 'xpub69D527HrF5cnXYE4wnov6CCAuUkVK4T4rQmSk7bZsL1H272YmRZJdAuVWEfsWKeSfVVTA4NTfyKt4ewZ6gtdPN1RuG5fRj45RYHT5LjvwsJ',
  xPrivKey_44H_0H_0H: 'xprv9ynVNvxjepWN96d9wsT1jbWR6iu3YSZNSMeSWLgUqrnKKtZNquZvkd24qNc5wbSj3rvmW7WerhFutju6orHZfena88LFqzn4FUvSMJU928t',
  xPubKey_44H_0H_0H: 'xpub6CmqnSVdVC4fMahd3tz26jT9ekjXwuHDoaa3Jj66QCKJCgtXPStBJRLYgfp5TcrH195VmbZUQGdYDFbYDpYKj7a7XsB34WmVDbCFSyAFty7',
  xPrivKey_1H: 'xprv9vDicbkxQi4TNYTwjWnLG6kwMMEmndxZbcVRaHxoLtJQYyB5e5napwNeN7xkHhRMqrUEU1ARW6AQH4zsDzj3ra19J5Wjb4UMTxMeXWUAd37',
  xPubKey_1H: 'xpub69D527HrF5ckb2YQqYKLdEhfuP5GC6gQxqR2NgNQuDqPRmWEBd6qNjh8DRJfYzQ4Y2WCw3NWR9Bn3YZkKa2yQiCG2xWKSMnMfg71pFEjCWd',
  privKey_1H_0: '95951f0e40d31bafe54a3098bd0ed898d370cc5d52a9318d7b7b14568da6cb5c',
  pubKey_1H_0: '0266cdb57b8a4d7c1b5b20ddeea43705420c6e3aef2c2979a3768b7b585839a0d3'
}, ];





module.exports.keyPair = keyPair;
module.exports.copayers = copayers;
module.exports.historyETH =
[ { id: '5ddbf1894ff1918017104cf4',
    txid:
     '0x0a0705762b283daf5ec1f6576d57befd7ee12070ee6372553b926abfa85996c4',
    fee: 420000000000000,
    category: 'receive',
    satoshis: 68054988430651970,
    height: -1,
    from: '0xEca2486A6A213fb40537658D7360AB6221EB26bE',
    address: '0x0B178eE619D7DFe9925fBBf66ab8C15Da5dccA8E',
    blockTime: '2019-11-25T15:21:45.534Z',
    internal: [] },
  { id: '5ddd367f4ff1918017f4def1',
    txid:
     '0x509364c953ac8b97cc9e7fbcbb28f8d87381d897004cfd5a22adb3d315e6ceba',
    fee: 273000000000000,
    category: 'receive',
    satoshis: 6900835001035125,
    height: 9004662,
    from: '0xEca2486A6A213fb40537658D7360AB6221EB26bE',
    address: '0x0B178eE619D7DFe9925fBBf66ab8C15Da5dccA8E',
    blockTime: '2019-11-26T14:28:39.000Z',
    internal: [] },
  { id: '5ddbf28d4ff191801711a948',
    txid:
     '0xf992febe3257518c00c09ae96cafe988dfe5b625bbf5515b679807f650f58e88',
    fee: 1100740000000000,
    category: 'send',
    satoshis: 0,
    height: 8999242,
    from: '0x0B178eE619D7DFe9925fBBf66ab8C15Da5dccA8E',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    blockTime: '2019-11-25T15:26:39.000Z',
    internal: [],
    abiType:
     '{"type":"ERC20","name":"transfer","params":[{"name":"_to","value":"0xeca2486a6a213fb40537658d7360ab6221eb26be","type":"address"},{"name":"_tokenId","value":"3000000","type":"uint256"}]}' },
  { id: '5ddbf1894ff1918017104cef',
    txid:
     '0x0a0705762b283daf5ec1f6576d57befd7ee12070ee6372553b926abfa85996c4',
    fee: 420000000000000,
    category: 'receive',
    satoshis: 68054988430651970,
    height: 8999223,
    from: '0xEca2486A6A213fb40537658D7360AB6221EB26bE',
    address: '0x0B178eE619D7DFe9925fBBf66ab8C15Da5dccA8E',
    blockTime: '2019-11-25T15:21:58.000Z',
    internal: [] },
  { id: '5d9363793fc0324dcc90fca6',
    txid:
     '0xf71539aec2e47751206fa03386c1cd6f4eb88cc077a67fb78434ce68f3e8c341',
    fee: 252000000000000,
    category: 'send',
    satoshis: -748000000000000,
    height: 8657023,
    from: '0x0B178eE619D7DFe9925fBBf66ab8C15Da5dccA8E',
    address: '0x93878cBE6a23aeBA4b1902E0B650b6dC61ee5823',
    blockTime: '2019-10-01T14:31:17.000Z',
    internal: [] },
  { id: '5d935f173fc0324dcc8d206e',
    txid:
     '0x09349b777a0609d980566aa388b1dc964a0a7d7571532764f359728ad480317c',
    fee: 60000000000000000,
    category: 'receive',
    satoshis: 1000000000000000,
    height: 8656927,
    from: '0x93878cBE6a23aeBA4b1902E0B650b6dC61ee5823',
    address: '0x0B178eE619D7DFe9925fBBf66ab8C15Da5dccA8E',
    blockTime: '2019-10-01T14:10:52.000Z',
    internal: [] },
  { id: '5d92a0cb3fc0324dcce80d5c',
    txid:
     '0x3bdbfd91b7e470d85f2741c0082cb4710493d79e6b60e5374a66d144598c7bfb',
    fee: 210000000000000,
    category: 'send',
    satoshis: -7328000000000000,
    height: 8653342,
    from: '0x0B178eE619D7DFe9925fBBf66ab8C15Da5dccA8E',
    address: '0x93878cBE6a23aeBA4b1902E0B650b6dC61ee5823',
    blockTime: '2019-10-01T00:41:15.000Z',
    internal: [] },
  { id: '5d92768d3fc0324dccc4ca05',
    txid:
     '0xe1d6adbad056def4abb4db4ce3d5f1a2f9b3b4e193b8ab2acf685f634161e804',
    fee: 252000000000000,
    category: 'send',
    satoshis: -1000000000000000,
    height: 8652525,
    from: '0x0B178eE619D7DFe9925fBBf66ab8C15Da5dccA8E',
    address: '0x93878cBE6a23aeBA4b1902E0B650b6dC61ee5823',
    blockTime: '2019-09-30T21:40:25.000Z',
    internal: [] },
  { id: '5d92715b3fc0324dccc07ec4',
    txid:
     '0x363904fb298a2ccc8d08b9445fcc985bf54ef4180485dfe06a1a4a3c28949ff2',
    fee: 210000000000000,
    category: 'send',
    satoshis: -1000000000000000,
    height: 8652434,
    from: '0x0B178eE619D7DFe9925fBBf66ab8C15Da5dccA8E',
    address: '0x93878cBE6a23aeBA4b1902E0B650b6dC61ee5823',
    blockTime: '2019-09-30T21:18:12.000Z',
    internal: [] },
  { id: '5d925d5c3fc0324dccafa286',
    txid:
     '0x8bcb795dcbd711898157dedf0cd0d4215f87cfc0fc0b0a9eb6a5d71f57a6bd0d',
    fee: 605000000000000,
    category: 'receive',
    satoshis: 10000000000000000,
    height: 8652063,
    from: '0x93878cBE6a23aeBA4b1902E0B650b6dC61ee5823',
    address: '0x0B178eE619D7DFe9925fBBf66ab8C15Da5dccA8E',
    blockTime: '2019-09-30T19:53:38.000Z',
    internal: [] } ];
