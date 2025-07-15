# WP Plugin Scaffold

The description for the plugin scaffolded by this repository.

## Use as template repository

With GitHub CLI, you can start your project based on the content of this
repository. Use:

```
gh repo create <your-plugin> --template marcin-wosinek/wp-plugin-scaffold --public --clone
```

Change the plugin name in files, on MacOS:

```
git grep -l wp-plugin-scaffold | xargs sed -i '' 's/wp-plugin-scaffold/<your-plugin>/g'
git grep -l 'WP Plugin Scaffold' | xargs sed -i '' 's/WP Plugin Scaffold/<Your Plugin>/g'
```

Then rename the files:

```
mv wp-plugin-scaffold <your-plugin>
```

Update the `composer.lock` file:

```
composer update
```

## Development

Use docker compose with:

* `docker compose up`. It spins up:
  * localhost:8080 with the WordPress,
  * localhost:8081 with phpMyAdmin

## Installation

### Using The WordPress Dashboard

1. Navigate to the 'Add New' Plugin Dashboard.
2. Select `wp-plugin-scaffold.zip` from your computer.
3. Upload.
4. Activate the plugin on the WordPress Plugin Dashboard.

### Using lTP

1. Extract `wp-plugin-scaffold.zip` to your computer.
2. Upload the `wp-plugin-scaffold` directory to your `wp-content/plugins` directory.
3. Activate the plugin on the WordPress Plugins Dashboard.

### Git

1. Navigate to the `plugins` directory of your WordPress installation.
2. From the terminal, run `$ git clone git@github.com:marcin-wosinek/wp-plugin-scaffold.git`

## Credits

Started form Tom McFarlin's work at
https://github.com/tommcfarlin/wp-plugin-scaffold.
