export const onSocketConnection = (socket, mongoClient, AWS_S3) => {
  //   socket.on('_get_modal', () => {});

  socket.on('_add_model', ({ modelData }) => {
    // console.log(modelData);
    const { thumbName, thumb, file, name, Class, Subject } = modelData;
    console.log('getting new Modal');
    // AWS_S3.updateMetadata()
    mongoClient.updateData({
      thumbName,
      thumb,
      fileAddr: `models/${name}`,
      name,
      Class,
      Subject,
    });
    AWS_S3.uploadObject(file, `models/${name}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
};
