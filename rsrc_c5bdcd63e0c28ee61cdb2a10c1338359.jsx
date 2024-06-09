
  const JSONContent = {
	"title": "Guides + FAQ",
	"children": [
	  {
        "title": "Guides",
        "html": "<strong>Helpful information for:</strong></br>Voicemail, International, Long Distance, and More",
		"image": "/Images/HomeSC/site/support/icon-guides.jpg",
		"children": [
            {
                "title": "Voicemail",
                "link": "https://www.homesc.com/Images/HomeSC/PDFs/Voice_Mail_Reference_Guide_Brochure.pdf#zoom=100"
            },
           
            {
                "title": "International Codes",
                "link": "https://www.homesc.com/images/HomeSC/2012site/support/pdfs/telephone/international-calling-codes.pdf#zoom=100"
            },
		   {
                "title": "International Rates",
                "link": "https://www.homesc.com/images/HomeSC/2012site/support/pdfs/telephone/international-calling-rates-3-13-13.pdf#zoom=100"
            },
            {
                "title": "Long Distance",
                "link": "https://www.homesc.com/images/HomeSC/2012site/support/pdfs/telephone/long-distance-service-aggreement.pdf#zoom=100"
            },
            {
                "title": "Federal Regulations",
                "children": [
			  {
				"title": "Detariffing Letter",
				"link": "https://www.homesc.com/images/HomeSC/2012site/support/pdfs/telephone/detarrifing-letter.pdf#zoom=100"
			  },
			  {
				"title": "Government Mandated Charges",
				"link": "https://www.homesc.com/images/HomeSC/2012site/support/pdfs/telephone/telco-government-mandated-charges-2011.pdf#zoom=100"
			  }
			]
		  },
		   {
                "title": "Terms & Conditions",
                 "children": [
			  {
				"title": "Digital Voice Terms and Conditions",
				"link": "https://www.homesc.com/images/HomeSC/2012site/support/pdfs/telephone/terms-conditions-digital-voice-2011.pdf#zoom=100"
			  },
				  {
				"title": "Rates Terms and Conditions for Voice",
				"link": "https://www.homesc.com/Images/HomeSC/2012site/support/pdfs/telephone/telephone-rates-terms-and-conditions-8-21-13.pdf#zoom=100"
			  },
				   {
				"title": "Electronic Letter of Authorization",
				"link": "https://www.homesc.com/images/HomeSC/2012site/support/pdfs/telephone/LOA-Port-0114.pdf#zoom=100"
			  }
				   ]
            }
        ]
      },
	  
	  
			  
			  
			  
	  
      {
        "title": "FAQs",
        "html": "<strong>All your questions answered:</strong></br>Available Packages, Voicemail, and Area Information",
		"image": "/Images/HomeSC/site/support/icon-faqs.png",
		"children": [
            {
                "title": "How Do I Access my Voicemail?",
                "html": "<strong>From your home telephone:</strong> Dial *99<br><br><strong>From any other telephone:</strong><br><u>Moncks Corner</u>: 843-482-1234<br><u>Bonneau/St Stephen</u>: 843-749-1234<br><u>Charleston/Summerville</u>: 843-471-1234<br><u>Harleyville</u>: 843-462-1234"
            },
            {
                "title": "Do You Have Information on Voice Packages?",
                "children": [
			  {
				"title": "Digital Voice Terms and Conditions",
				"link": "https://www.homesc.com/images/HomeSC/2012site/support/pdfs/telephone/terms-conditions-digital-voice-2011.pdf#zoom=100"
			  },
				  {
				"title": "Rates Terms and Conditions for Voice",
				"link": "https://www.homesc.com/Images/HomeSC/2012site/support/pdfs/telephone/telephone-rates-terms-and-conditions-8-21-13.pdf#zoom=100"
			  },
				   {
				"title": "Electronic Letter of Authorization",
				"link": "https://www.homesc.com/images/HomeSC/2012site/support/pdfs/telephone/LOA-Port-0114.pdf#zoom=100"
			  }
				   ]
            },
            {
                "title": "What options are in my area?",
                "children": [
			  {
				"title": "Voice Service in Bonneau/St.Stephen",
				"html": "<div class='spacer'>&nbsp;</div>",
				"link": "https://www.homesc.com/Images/HomeSC/PDFs/voice/Voice_Service_Digital_1_11_24_Updated.pdf"
			  },
				  {
				"title": "Voice Service in Daniel Island",
					"html": "<div class='spacer'>&nbsp;</div>",
				"link": "https://www.homesc.com/Images/HomeSC/PDFs/voice/Voice_CLEC_1_3_24.pdf#zoom=100"
			  },
				   {
				"title": "Voice Service in Moncks Corner",
					 "html": "<div class='spacer'>&nbsp;</div>",
				"link": "https://www.homesc.com/Images/HomeSC/PDFs/voice/Voice_Service_ILEC_1_3_24.pdf#zoom=100"
			  }
				   ]
            }
        ]
      }
	]
  }



  document.addEventListener('alpine:init', () => {
							Alpine.data('internetContent', () => ({
	history: [],
	openFAQs: [],
	content: JSONContent,
	current: JSONContent.children,
	toggleFAQ(title) {
	  if (this.openFAQs.includes(title)) {
		this.openFAQs = this.openFAQs.filter(t => t !== title)
	  } else {
		this.openFAQs.push(title)
	  }
	},
	navigate(child) {
	  this.history.push(this.current)
	  this.current = child.children
	},
	goBack() {
	  if (this.history.length === 0) return
	  this.current = this.history.pop()
		}
  }))
  })
