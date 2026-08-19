import	{	useState,	useEffect	}	from	"react";
//	A	custom	Hook	is	just	a	regular	function	whose	name	starts	with	"use"
//	and	that	calls	other	Hooks	inside	it.
function	useFetch(url)	{
const	[data,	setData]	=	useState(null);
const	[loading,	setLoading]	=	useState(true);
const	[error,	setError]	=	useState(null);
useEffect(()	=>	{
let	cancelled	=	false;
setLoading(true);
fetch(url)
.then(res	=>	{
if	(!res.ok)	throw	new	Error(`HTTP	error:	${res.status}`);
return	res.json();
})
.then(json	=>	{	if	(!cancelled)	{	setData(json);	setLoading(false);	}	})
.catch(err	=>	{	if	(!cancelled)	{	setError(err.message);	setLoading(false);	}	});
return	()	=>	{	cancelled	=	true;	};	//	avoid	state	updates	after	unmount
},	[url]);
return	{	data,	loading,	error	};
}
export	default	useFetch;