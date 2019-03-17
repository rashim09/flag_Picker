
import React, {Component} from 'react';


class DisplayFlag extends Component { 
    render() { 
        return (
                <div>
                    <img
          
                        alt={this.props.countryName}
                        width="100"
                        height="100"  
                        src={`http://www.countryflags.io/${this.props.countryCode}/${this.props.style}/${this.props.size}.png`}
                        />
                </div>
        )
    }
}

DisplayFlag.defaultProps = {
    size: 64, // 16, 24, 32, 48, 64
    style: "shiny", //flat, shiny
    countryCode: "US",
    countryName: "United States"
}

export default DisplayFlag;