@@ -28,7 +28,6 @@ export default class Cardd extends React.PureComponent {
    render(){
      var subtitle = this.props.item.summary.split("</p>",1);
      var sub2 = subtitle[0].substr(3);
      var sub3 = sub2.split(" ");

      //console.log(sub3[1]);
        return (

                <PaperProvider theme={theme}>
@ -41,9 +40,9 @@ export default class Cardd extends React.PureComponent {
                  </Card.Content>
                  <Card.Cover source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBk9rGEmH-aZgOUCnYpDMYqkF1a19BZHCh-tTfE_aeAG5u5akQ&s"}} />
                  <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                  </Card.Actions>
                   <Button>Cancel</Button>
                   <Button>Ok</Button>
                 </Card.Actions>
                  </View>
                </TouchableOpacity>
                </Card>
@ -65,11 +64,12 @@ const styles = StyleSheet.create({
       shadowOffset:{
            width:3,
            height:3
            }
          },
      margin: 5
     },
     cardImage:{
         width:'100%',
         height:200,
         height:180,
         resizeMode:'cover'
     },
     cardText:{
