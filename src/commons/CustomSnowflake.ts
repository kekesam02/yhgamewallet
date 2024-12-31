// Import the Snowflake class
const { TwitterSnowflake } = require('@sapphire/snowflake');

class CustomSnowflake {
    public static snowflake = () => {
        return TwitterSnowflake.generate() + ''
    }
}

export default CustomSnowflake