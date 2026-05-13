

CSV File Directory:

/work/data/NSE/TickData/CM/2026/APR/30\_APR\_2026/min1/DATA/Index



CSV:

idxToken

&#x09;Q. Is it same as equityId in **intraday\_1\_min\_data table**

Available Data:

&#x09;equityId



DS:
	Map<TimestampMillis, dto>

DTO:
	open float

&#x09;high float

&#x09;low float

&#x09;close float


SQL:

&#x09;**intraday\_1\_min\_data table**



&#x09;id bigint NOT NULL DEFAULT '0',

&#x09;equity\_id int DEFAULT NULL,

&#x09;open float DEFAULT NULL,

&#x09;high float DEFAULT NULL,

&#x09;low float DEFAULT NULL,

&#x09;close float DEFAULT NULL,

&#x09;trade\_time datetime DEFAULT NULL,

&#x09;volume int DEFAULT NULL,

&#x09;update\_status\_id int DEFAULT NULL,

&#x09;mkt\_hours smallint DEFAULT NULL,

- Vol. NA in CSV.
- What is mkt\_hrs field ?





